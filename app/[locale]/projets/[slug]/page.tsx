import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { CaseHero } from "@/components/case/CaseHero";
import { KpiRow } from "@/components/case/KpiRow";
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

  return <CaseStudyBody caseStudy={caseStudy} />;
}

function CaseStudyBody({ caseStudy }: { caseStudy: NonNullable<ReturnType<typeof getCaseStudy>> }) {
  return (
    <Section>
      <h1 className="text-balance text-xl text-ink sm:text-2xl">{caseStudy.title}</h1>
      <p className="measure mb-6 mt-2 text-sm text-graphite sm:text-base">{caseStudy.subtitle}</p>

      <CaseHero hero={caseStudy.hero} />

      <div className="my-6">
        <ConfidentialNotice confidential={caseStudy.confidential} />
      </div>

      <KpiRow kpis={caseStudy.kpis} />

      <Prose>
        <MDXRemote source={caseStudy.content} />
      </Prose>
    </Section>
  );
}
