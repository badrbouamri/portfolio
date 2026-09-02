import { FramedImage } from "@/components/ui/FramedImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import type { CaseStudy } from "@/lib/schema";

// BRIEF §4.1 Bloc 5 — full-width case-study feature: large FramedImage,
// two-column eyebrow+title / summary+CTA, then a <Stat /> band built
// directly from the case study's own `kpis` frontmatter. Per §5.3's exact
// reveal list, only the image and the stat band animate on scroll — the
// eyebrow/title/summary/CTA are visible immediately, not wrapped in Reveal.
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
      <Reveal>
        {caseStudy.hero ? (
          <Parallax from={-24} to={24}>
            <FramedImage
              src={caseStudy.hero.src}
              alt={caseStudy.hero.alt}
              ratio="21/9"
              className="mb-10"
              sizes="(min-width: 1024px) 1140px, 100vw"
            />
          </Parallax>
        ) : (
          <div aria-hidden className="hero-grid-bg mb-10 aspect-[21/9] w-full rounded-hairline border border-rule" />
        )}
      </Reveal>

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
        <Reveal stagger className="mt-10 grid grid-cols-1 divide-y divide-rule border border-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {caseStudy.kpis.map((kpi) => (
            <Stat key={kpi.label} value={kpi.value} label={kpi.label} className="p-6" />
          ))}
        </Reveal>
      ) : null}
    </div>
  );
}
