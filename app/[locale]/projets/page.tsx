import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getAllCaseStudies } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectsExplorer } from "./_components/ProjectsExplorer";

export default async function ProjetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Projets");
  const caseStudies = getAllCaseStudies(locale as Locale);

  return (
    <Section>
      <Reveal sweep>
        <p className="mb-2 font-data text-xs uppercase tracking-wide text-steel">
          {t("eyebrow")}
        </p>
      </Reveal>
      <Reveal>
        <h1 className="mb-4 text-2xl text-ink">{t("title")}</h1>
      </Reveal>
      <Reveal>
        <p className="measure mb-6 text-graphite">{t("intro")}</p>
      </Reveal>

      <Suspense fallback={null}>
        <ProjectsExplorer caseStudies={caseStudies} />
      </Suspense>
    </Section>
  );
}
