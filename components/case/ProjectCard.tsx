import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy } from "@/lib/schema";

// Shared uniform project card — BRIEF §4.1 Bloc 4 (large variant, with
// image) and §4.2 /projets (uniform grid, `showImage` defaults true there).
export function ProjectCard({
  caseStudy,
  categoryLabel,
  ctaLabel,
  showImage = true,
  toolLimit = 3,
}: {
  caseStudy: CaseStudy;
  categoryLabel: string;
  ctaLabel: string;
  showImage?: boolean;
  toolLimit?: number;
}) {
  return (
    <Link href={`/projets/${caseStudy.slug}`} className="group block h-full">
      <Card variant={showImage ? "feature" : "default"} className="flex h-full flex-col">
        {showImage ? (
          <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-hairline border border-rule">
            {caseStudy.hero ? (
              <Image
                src={caseStudy.hero.src}
                alt={caseStudy.hero.alt}
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
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
          {caseStudy.tools.slice(0, toolLimit).map((tool) => (
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
