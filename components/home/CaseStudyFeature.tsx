import { FramedImage } from "@/components/ui/FramedImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import type { CaseStudy } from "@/lib/schema";

// BRIEF §4.1 Bloc 5 — full-width case-study feature: large FramedImage,
// two-column eyebrow+title / summary+CTA, then a <Stat /> band built
// directly from the case study's own `kpis` frontmatter (currently one
// entry — see the Phase 5 checkpoint note on whether to add more).
export function CaseStudyFeature({
  caseStudy,
  eyebrow,
  ctaLabel,
}: {
  caseStudy: CaseStudy;
  eyebrow: string;
  ctaLabel: string;
}) {
  return (
    <div>
      {caseStudy.hero ? (
        <FramedImage
          src={caseStudy.hero.src}
          alt={caseStudy.hero.alt}
          ratio="21/9"
          className="mb-10"
          sizes="(min-width: 1024px) 1140px, 100vw"
        />
      ) : (
        <div aria-hidden className="hero-grid-bg mb-10 aspect-[21/9] w-full rounded-hairline border border-rule" />
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="text-h2 font-display mt-3 text-ink">{caseStudy.title}</h2>
        </div>
        <div className="flex flex-col items-start gap-4">
          <p className="text-graphite">{caseStudy.summary}</p>
          <Button href={`/projets/${caseStudy.slug}`}>{ctaLabel}</Button>
        </div>
      </div>

      {caseStudy.kpis.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 divide-y divide-rule border border-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {caseStudy.kpis.map((kpi) => (
            <Stat key={kpi.label} value={kpi.value} label={kpi.label} className="p-6" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
