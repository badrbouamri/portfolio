"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactFormSchema, type ContactFieldErrors } from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/routing";
import type { ContactFormState } from "@/lib/contact-form-state";

const CONTACT_RECIPIENT = process.env.CONTACT_TO_EMAIL ?? "badrbouamri4@gmail.com";
// resend.dev's shared sending address works without a verified custom domain —
// swap for a verified "contact@<domain>" once the portfolio domain is set up.
const CONTACT_SENDER = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

function getClientIp(headerList: Headers): string {
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return headerList.get("x-real-ip") ?? "unknown";
}

export async function submitContactMessage(
  locale: Locale,
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // NOTE: formError / fieldErrors below are message-catalogue KEYS (see
  // lib/contact-schema.ts), not translated strings — this action has no
  // reliable knowledge of which UI will render them, so translation happens
  // once, client-side, via `t(key)` in ContactForm.tsx. Resolving them here
  // with next-intl's server-side `getTranslations` would double-translate:
  // the client would then try to look up an already-translated sentence as
  // if it were a key, and fail.

  // Honeypot: a hidden field real users never fill. Any non-empty value here
  // is almost certainly a bot — reject silently as "success" so the bot's
  // script doesn't learn its submission was rejected and try to adapt.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success" };
  }

  const headerList = await headers();
  const ip = getClientIp(headerList);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return { status: "error", formError: "error_rate_limited" };
  }

  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    organisation: formData.get("organisation"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFieldErrors | undefined;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { status: "error", fieldErrors, formError: "error_form_invalid" };
  }

  const { name, email, organisation, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Expected in this environment — no RESEND_API_KEY is configured here.
    // Log server-side for diagnosis, but never let the missing key crash the
    // request or leak internal detail to the visitor: show the same graceful
    // fallback message as any other delivery failure, pointing them at the
    // plain-text email/phone shown alongside the form.
    console.error(
      "[contact] RESEND_API_KEY is not set — cannot send contact email. " +
        "Configure it in the deployment environment to enable the form.",
    );
    return { status: "error", formError: "error_generic" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: CONTACT_SENDER,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `[Portfolio] Nouveau message de ${name}`,
      text: [
        `Nom: ${name}`,
        `Email: ${email}`,
        `Organisation: ${organisation || "(non renseigné)"}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend API returned an error:", error);
      return { status: "error", formError: "error_generic" };
    }
  } catch (err) {
    console.error("[contact] Unexpected error while sending contact email:", err);
    return { status: "error", formError: "error_generic" };
  }

  trackEvent("contact_submitted", { locale });

  return { status: "success" };
}
