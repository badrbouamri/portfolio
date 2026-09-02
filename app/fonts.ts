import localFont from "next/font/local";

// Redesign (BRIEF-REFONTE-PORTFOLIO.md §2.2): Bodoni Moda for display, Inter
// Tight for body. Self-hosted via next/font/local rather than next/font/google
// as the brief specifies — this project self-hosts fonts specifically for
// reliability in Morocco (see DESIGN.md → Typography), and that reasoning
// doesn't change because the reference did. Files fetched once from Google
// Fonts' latin subset and committed under public/fonts/, same as every other
// family here. Superseded IBM Plex Sans Condensed / IBM Plex Sans (still on
// disk under public/fonts/ pending Phase 8 cleanup, in case of rollback).
//
// Bodoni Moda (Display) is declared in app/[locale]/layout.tsx, not here —
// next/font's automatic preload only fires when the font-loader call itself
// lives in a rendered layout/page file (Next keys its per-file preload
// manifest on that file's own path); a shared fonts.ts module is never
// itself a rendered segment, so nothing declared here ever gets preloaded
// regardless of the `preload` option. That's exactly what the brief wants
// for Body/Mono ("préchargement du seul Display") — only Display needs to
// move.

export const interTight = localFont({
  src: [
    {
      path: "../public/fonts/inter-tight/inter-tight-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter-tight/inter-tight-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const plexMono = localFont({
  src: [
    {
      path: "../public/fonts/ibm-plex-mono/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-mono/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-data",
  display: "swap",
});
