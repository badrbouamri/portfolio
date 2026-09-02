import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy } from "@/lib/schema";

// BRIEF §4.1 Bloc 4 — asymmetric grid: the featured slot (Stellantis) takes
// 6 of 12 columns with an image, the rest take 3 each without one. Order is
// otherwise free (no numbering, per the brief's own numbering-discipline
// rule) — this replaces ProjectRow on the homepage only; ProjectRow itself
// stays in place for /projets until Phase 6 addresses that page.
function ProjectCard({
  caseStudy,
  categoryLabel,
  ctaLabel,
  span,
}: {
  caseStudy: CaseStudy;
  categoryLabel: string;
  ctaLabel: string;
  span: "large" | "small";
}) {
  return (
    <Link
      href={`/projets/${caseStudy.slug}`}
      className={`group ${span === "large" ? "sm:col-span-6" : "sm:col-span-3"}`}
    >
      <Card variant={span === "large" ? "feature" : "default"} className="flex h-full flex-col">
        {span === "large" ? (
          <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-hairline border border-rule">
            {caseStudy.hero ? (
              <Image
                src={caseStudy.hero.src}
                alt={caseStudy.hero.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            ) : (
              <div aria-hidden className="hero-grid-bg absolute inset-0" />
            )}
          </div>
        ) : null}

        <span className="font-data text-xs uppercase tracking-wide text-accent">{categoryLabel}</span>
        <h3 className="text-h3 mt-2 text-ink">{caseStudy.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-graphite">{caseStudy.summary}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {caseStudy.tools.slice(0, span === "large" ? 4 : 3).map((tool) => (
            <Tag key={tool}>{tool}</Tag>
          ))}
        </div>

        <span className="mt-auto pt-4 font-data text-xs uppercase tracking-wide text-ink">
          {ctaLabel} <span className="cta-arrow">→</span>
        </span>
      </Card>
    </Link>
  );
}

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
      <ProjectCard caseStudy={big} categoryLabel={categoryLabel(big.category)} ctaLabel={ctaLabel} span="large" />
      {small.map((cs) => (
        <ProjectCard key={cs.slug} caseStudy={cs} categoryLabel={categoryLabel(cs.category)} ctaLabel={ctaLabel} span="small" />
      ))}
    </div>
  );
}
