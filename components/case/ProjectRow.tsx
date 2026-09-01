import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/lib/schema";

// Engineering Projects row (2026-09-01) — replaces the ProjectCard grid tile
// with an editorial image+text row per an explicit reference-screenshot
// request; see CLAUDE.md and DESIGN.md → Cards.
export function ProjectRow({
  caseStudy,
  ctaLabel,
  reverse = false,
}: {
  caseStudy: CaseStudy;
  ctaLabel: string;
  reverse?: boolean;
}) {
  return (
    <Link
      href={`/projets/${caseStudy.slug}`}
      className={`group flex flex-col gap-6 border-t border-rule pt-8 sm:items-center sm:gap-10 ${
        reverse ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:w-[320px]">
        {caseStudy.hero ? (
          <Image
            src={caseStudy.hero.src}
            alt={caseStudy.hero.alt}
            fill
            sizes="(min-width: 768px) 320px, 100vw"
            className="object-cover transition-transform duration-300 ease-[var(--ease-plot)] group-hover:scale-[1.02]"
          />
        ) : (
          <div className="hero-grid-bg absolute inset-0" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-editorial text-xl text-graphite sm:text-2xl">{caseStudy.title}</h3>
        <p className="font-editorial text-lg text-editorial-accent">{caseStudy.subtitle}</p>
        <p className="mt-1 text-sm text-graphite">{caseStudy.summary}</p>
        <span className="mt-2 font-data text-xs uppercase tracking-wide text-accent">
          {ctaLabel} <span className="cta-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}
