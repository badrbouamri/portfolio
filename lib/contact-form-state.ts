import type { ContactFieldErrors } from "@/lib/contact-schema";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: ContactFieldErrors;
  formError?: string;
};

export const contactFormInitialState: ContactFormState = { status: "idle" };
