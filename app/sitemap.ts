import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllCaseStudySlugs } from "@/lib/content";

// No production domain configured yet (M0 deferred the custom domain to a
// *.vercel.app subdomain, still not connected as of M5) — set NEXT_PUBLIC_SITE_URL
// once a real deploy URL exists, same convention as app/[locale]/layout.tsx.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STATIC_PATHS = ["", "/parcours", "/competences", "/projets", "/contact", "/mentions-legales"];

// Excluded pending the Stellantis internship confidentiality-clause verification
// required by PRD §10.3 — that check has not been done (see docs/tasks.md M1).
// The page itself has no code-level publish gate, so this is the one safeguard
// against search engines indexing it before that legal check clears. The route
// is still directly reachable (and linked from the homepage/Projets index) —
// this only keeps it out of the sitemap, it does not unpublish it.
const UNVERIFIED_SLUGS = ["stellantis-maitrise-cout-transformation"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(),
      });
    }

    for (const slug of getAllCaseStudySlugs(locale)) {
      if (UNVERIFIED_SLUGS.includes(slug)) continue;
      entries.push({
        url: `${SITE_URL}/${locale}/projets/${slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
