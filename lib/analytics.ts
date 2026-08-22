// TODO(M2 SEO/analytics workstream): wire to Vercel Web Analytics `track()`.
// Stubbed now so the CV redirect route has a single call site to update later.
export function trackEvent(
  name: "cv_download" | "case_study_read" | "demo_opened" | "contact_submitted" | "locale_switched",
  data?: Record<string, string>,
) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[analytics stub] ${name}`, data ?? {});
  }
}
