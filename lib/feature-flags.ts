// Demos ship behind a flag and are revealed only once complete and mobile-tested
// (PRD §11.2 — "a recruiter must never encounter an empty dashboard or a spinning
// loader"). Default to disabled; flip the env var on only after manual mobile QA.
// Each demo route checks its flag server-side and calls notFound() when off, so a
// disabled demo 404s cleanly rather than shipping a broken/half-built page.

export const featureFlags = {
  demoConsommables: process.env.NEXT_PUBLIC_DEMO_CONSOMMABLES === "true",
  demoPilotage: process.env.NEXT_PUBLIC_DEMO_PILOTAGE === "true",
} as const;
