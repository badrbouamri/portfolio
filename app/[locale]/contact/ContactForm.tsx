"use client";

import { useActionState, useId, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/routing";
import { submitContactMessage } from "./actions";
import { contactFormInitialState } from "@/lib/contact-form-state";

// BRIEF §4.2 <Contact /> fields: transparent background, 1px bottom rule
// that turns --accent on focus, floating label. The peer-based float relies
// on `placeholder=" "` (a single space, never empty string) so
// `:placeholder-shown` only matches an actually-empty field, and on the
// label following the control in DOM order (peer-* is a sibling selector).
const fieldClass =
  "peer w-full border-0 border-b border-rule bg-transparent px-0 pb-2 pt-5 text-ink outline-none transition-colors focus:border-accent";
const labelClass =
  "pointer-events-none absolute left-0 top-5 text-steel transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  autoComplete,
  maxLength,
  errorId,
  invalid,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  errorId: string;
  invalid: boolean;
  error?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder=" "
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          className={fieldClass}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={invalid ? errorId : undefined}
        />
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="font-data text-xs text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

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

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
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

      <Field
        id={nameId}
        name="name"
        label={t("field_name_label")}
        required
        autoComplete="name"
        maxLength={100}
        errorId={`${nameId}-error`}
        invalid={!!state.fieldErrors?.name}
        error={state.fieldErrors?.name ? t(state.fieldErrors.name) : undefined}
      />

      <Field
        id={emailId}
        name="email"
        label={t("field_email_label")}
        type="email"
        required
        autoComplete="email"
        maxLength={200}
        errorId={`${emailId}-error`}
        invalid={!!state.fieldErrors?.email}
        error={state.fieldErrors?.email ? t(state.fieldErrors.email) : undefined}
      />

      <Field
        id={organisationId}
        name="organisation"
        label={t("field_organisation_label")}
        autoComplete="organization"
        maxLength={150}
        errorId={`${organisationId}-error`}
        invalid={!!state.fieldErrors?.organisation}
        error={state.fieldErrors?.organisation ? t(state.fieldErrors.organisation) : undefined}
      />

      <div className="flex flex-col gap-1.5">
        <div className="relative">
          <textarea
            id={messageId}
            name="message"
            placeholder=" "
            required
            rows={6}
            maxLength={2000}
            className={fieldClass}
            aria-invalid={state.fieldErrors?.message ? true : undefined}
            aria-describedby={state.fieldErrors?.message ? `${messageId}-error` : undefined}
          />
          <label htmlFor={messageId} className={labelClass}>
            {t("field_message_label")}
          </label>
        </div>
        {state.fieldErrors?.message ? (
          <p id={`${messageId}-error`} role="alert" className="font-data text-xs text-accent">
            {t(state.fieldErrors.message)}
          </p>
        ) : null}
      </div>

      <div aria-live="polite">
        {state.status === "error" && state.formError ? (
          <p role="alert" className="text-sm text-accent">
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
