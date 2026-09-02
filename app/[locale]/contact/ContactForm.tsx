"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/routing";
import { submitContactMessage } from "./actions";
import { contactFormInitialState } from "@/lib/contact-form-state";

const inputClass =
  "w-full rounded-[2px] border border-rule bg-surface px-3 py-2 text-sm text-ink placeholder:text-steel";

function SubmitButton() {
  const t = useTranslations("Contact");
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="solid" disabled={pending} aria-busy={pending}>
      {pending ? t("form_submitting") : t("form_submit")}
    </Button>
  );
}

export function ContactForm({ locale }: { locale: Locale }) {
  const t = useTranslations("Contact");
  const boundAction = submitContactMessage.bind(null, locale);
  const [state, formAction] = useActionState(boundAction, contactFormInitialState);

  const nameId = useId();
  const emailId = useId();
  const organisationId = useId();
  const messageId = useId();
  const nameErrorId = `${nameId}-error`;
  const emailErrorId = `${emailId}-error`;
  const organisationErrorId = `${organisationId}-error`;
  const messageErrorId = `${messageId}-error`;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from sighted users via a clip-based technique (not
          display:none/visibility:hidden, which some bots special-case) and
          removed from the tab order + accessibility tree. Real users never
          see or fill this; anything submitted here is treated as spam. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          margin: "-1px",
          padding: 0,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        <label htmlFor="website">Ne pas remplir / Do not fill</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={nameId} className="text-sm font-medium text-ink">
          {t("field_name_label")}
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={100}
          className={inputClass}
          aria-invalid={state.fieldErrors?.name ? true : undefined}
          aria-describedby={state.fieldErrors?.name ? nameErrorId : undefined}
        />
        {state.fieldErrors?.name ? (
          <p id={nameErrorId} role="alert" className="font-data text-xs text-signal">
            {t(state.fieldErrors.name)}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={emailId} className="text-sm font-medium text-ink">
          {t("field_email_label")}
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={200}
          className={inputClass}
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          aria-describedby={state.fieldErrors?.email ? emailErrorId : undefined}
        />
        {state.fieldErrors?.email ? (
          <p id={emailErrorId} role="alert" className="font-data text-xs text-signal">
            {t(state.fieldErrors.email)}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={organisationId} className="text-sm font-medium text-ink">
          {t("field_organisation_label")}
        </label>
        <input
          id={organisationId}
          name="organisation"
          type="text"
          autoComplete="organization"
          maxLength={150}
          className={inputClass}
          aria-invalid={state.fieldErrors?.organisation ? true : undefined}
          aria-describedby={state.fieldErrors?.organisation ? organisationErrorId : undefined}
        />
        {state.fieldErrors?.organisation ? (
          <p id={organisationErrorId} role="alert" className="font-data text-xs text-signal">
            {t(state.fieldErrors.organisation)}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={messageId} className="text-sm font-medium text-ink">
          {t("field_message_label")}
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={6}
          maxLength={2000}
          className={inputClass}
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          aria-describedby={state.fieldErrors?.message ? messageErrorId : undefined}
        />
        {state.fieldErrors?.message ? (
          <p id={messageErrorId} role="alert" className="font-data text-xs text-signal">
            {t(state.fieldErrors.message)}
          </p>
        ) : null}
      </div>

      <div aria-live="polite">
        {state.status === "error" && state.formError ? (
          <p role="alert" className="text-sm text-signal">
            {t(state.formError)}
          </p>
        ) : null}
        {state.status === "success" ? (
          <p role="status" className="text-sm text-accent">
            {t("form_success")}
          </p>
        ) : null}
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
