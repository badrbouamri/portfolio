import { z } from "zod";

// Validation error values are message-catalogue KEYS (looked up in the "Contact"
// namespace of messages/fr.json and messages/en.json), not literal user-facing
// strings — the server action runs before we know which field markup will render
// the message, and the client renders these via `t(key)`.
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "error_name_min")
    .max(100, "error_name_max"),
  email: z
    .string()
    .trim()
    .min(1, "error_email_required")
    .max(200, "error_email_max")
    .email("error_email_invalid"),
  organisation: z
    .string()
    .trim()
    .max(150, "error_organisation_max")
    .optional()
    .transform((value) => value ?? ""),
  message: z
    .string()
    .trim()
    .min(10, "error_message_min")
    .max(2000, "error_message_max"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormValues, string>
>;
