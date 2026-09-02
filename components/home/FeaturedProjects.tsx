import { ProjectCard } from "@/components/case/ProjectCard";
import type { CaseStudy } from "@/lib/schema";

// BRIEF §4.1 Bloc 4 — asymmetric grid: the featured slot (Stellantis) takes
// 6 of 12 columns with an image, the rest take 3 each without one. Order is
// otherwise free (no numbering, per the brief's own numbering-discipline
// rule) — this replaces ProjectRow on the homepage only; ProjectRow itself
// stays in place for /projets until Phase 6 addresses that page.
export function FeaturedProjects({
  featured,
  featuredSlug,
  categoryLabel,
  ctaLabel,
}: {
  featured: CaseStudy[];
  featuredSlug: string;
  categoryLabel: (category: CaseStudy["category"]) => string;
  ctaLabel: string;
}) {
  const big = featured.find((cs) => cs.slug === featuredSlug) ?? featured[0];
  if (!big) return null;
  const small = featured.filter((cs) => cs.slug !== big.slug);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
      <div className="sm:col-span-6">
        <ProjectCard caseStudy={big} categoryLabel={categoryLabel(big.category)} ctaLabel={ctaLabel} toolLimit={4} />
      </div>
      {small.map((cs) => (
        <div key={cs.slug} className="sm:col-span-3">
          <ProjectCard caseStudy={cs} categoryLabel={categoryLabel(cs.category)} ctaLabel={ctaLabel} showImage={false} />
        </div>
      ))}
    </div>
  );
}
