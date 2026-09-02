import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations } from "next-intl/server";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { FramedImage } from "@/components/ui/FramedImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stat } from "@/components/ui/Stat";
import { ConfidentialNotice } from "@/components/case/ConfidentialNotice";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";

export function generateStaticParams() {
  // Only "fr" content exists as of M2 (see docs/tasks.md M3 — bilingual translation
  // is a later milestone). Tolerate an empty "en" set rather than erroring.
  return (["fr", "en"] as const).flatMap((locale) =>
    getAllCaseStudies(locale).map((cs) => ({ locale, slug: cs.slug })),
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const caseStudy = getCaseStudy(locale as Locale, slug);

  if (!caseStudy) {
    notFound();
  }

  const tProjets = await getTranslations("Projets");
  const all = getAllCaseStudies(locale as Locale);
  const currentIndex = all.findIndex((cs) => cs.slug === slug);
  const next = currentIndex >= 0 ? all[(currentIndex + 1) % all.length] : null;

  return (
    <CaseStudyBody
      caseStudy={caseStudy}
      categoryLabel={tProjets(`category_${caseStudy.category}`)}
      organisationFallback={tProjets("organisation_generic")}
      next={next}
      nextLabel={tProjets("next_project")}
    />
  );
}

function CaseStudyBody({
  caseStudy,
  categoryLabel,
  organisationFallback,
  next,
  nextLabel,
}: {
  caseStudy: NonNullable<ReturnType<typeof getCaseStudy>>;
  categoryLabel: string;
  organisationFallback: string;
  next: NonNullable<ReturnType<typeof getCaseStudy>> | null;
  nextLabel: string;
}) {
  // BRIEF §4.2 /projets/[slug]: category filet + Display h1 + mono meta
  // line (period · organisation · role) — reintroducing the fields the
  // pre-redesign CaseHero deliberately dropped on 2026-09-01, per the
  // brief's own explicit spec for this page. organisationPublic false falls
  // back to a generic label (same pattern as opengraph-image.tsx); every
  // case study currently sets it true.
  const metaOrg = caseStudy.organisationPublic ? caseStudy.organisation : organisationFallback;
  const meta = `${caseStudy.period.start} → ${caseStudy.period.end} · ${metaOrg} · ${caseStudy.role}`;

  return (
    <Section>
      <SectionLabel className="mb-3">{categoryLabel}</SectionLabel>
      <h1 className="text-hero font-display text-balance leading-none text-ink">{caseStudy.title}</h1>
      <p className="font-data mb-8 mt-4 text-sm text-steel">{meta}</p>

      {caseStudy.hero ? (
        <FramedImage
          src={caseStudy.hero.src}
          alt={caseStudy.hero.alt}
          ratio="21/9"
          priority
          className="mb-10"
          sizes="(min-width: 1200px) 1140px, 100vw"
        />
      ) : (
        <div aria-hidden className="hero-grid-bg mb-10 aspect-[21/9] w-full rounded-hairline border border-rule" />
      )}

      <div className="measure mx-auto mb-6">
        <ConfidentialNotice confidential={caseStudy.confidential} />
      </div>

      <Prose>
        <MDXRemote source={caseStudy.content} />
      </Prose>

      {caseStudy.kpis.length > 0 ? (
        <div
          data-print-avoid-break
          className="mx-auto mt-10 grid max-w-[68ch] grid-cols-1 divide-y divide-rule border border-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {caseStudy.kpis.map((kpi) => (
            <Stat key={kpi.label} value={kpi.value} label={kpi.label} className="p-6" />
          ))}
        </div>
      ) : null}

      {next ? (
        <div className="mx-auto mt-10 max-w-[68ch] border-t border-rule pt-6">
          <Link href={`/projets/${next.slug}`} className="group block">
            <span className="font-data text-xs uppercase tracking-wide text-steel">{nextLabel}</span>
            <span className="mt-1 flex items-center gap-2 text-ink transition-colors group-hover:text-accent">
              {next.title} <span className="cta-arrow">→</span>
            </span>
          </Link>
        </div>
      ) : null}
    </Section>
  );
}
