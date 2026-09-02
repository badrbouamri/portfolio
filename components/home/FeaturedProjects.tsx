import { ProjectCard } from "@/components/case/ProjectCard";
import type { CaseStudy } from "@/lib/schema";

// BRIEF §4.1 Bloc 4 originally specified an asymmetric 6/3/3 grid (the
// featured slot twice as wide as the other two). Owner request, 2026-09-02:
// that made the two smaller cards' images look tiny next to the featured
// one's — switched to an equal-width 3-up grid so all three project images
// render at the same size. Order is otherwise free (no numbering, per the
// brief's own numbering-discipline rule).
export function FeaturedProjects({
  featured,
  categoryLabel,
  ctaLabel,
}: {
  featured: CaseStudy[];
  categoryLabel: (category: CaseStudy["category"]) => string;
  ctaLabel: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {featured.map((cs) => (
        <ProjectCard key={cs.slug} caseStudy={cs} categoryLabel={categoryLabel(cs.category)} ctaLabel={ctaLabel} />
      ))}
    </div>
  );
}
