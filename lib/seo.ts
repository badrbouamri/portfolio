import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

// Next.js merges a page's `alternates` with its layout's wholesale, not
// field-by-field — so any page that sets `canonical` must also repeat
// `languages` here, or it silently loses its hreflang tags. `path` is the
// route below the locale segment, e.g. "" for the homepage, "/parcours",
// or "/projets/some-slug" — never including the locale prefix itself.
export function pageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      fr: `/fr${path}`,
      en: `/en${path}`,
      "x-default": `/fr${path}`,
    },
  };
}
