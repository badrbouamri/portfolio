import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getAllCaseStudies } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
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
      <p className="mb-2 font-data text-xs uppercase tracking-wide text-steel">
        {t("eyebrow")}
      </p>
      <h1 className="mb-4 text-2xl text-ink">{t("title")}</h1>
      <p className="measure mb-6 text-graphite">{t("intro")}</p>

      <Suspense fallback={null}>
        <ProjectsExplorer caseStudies={caseStudies} />
      </Suspense>
    </Section>
  );
}
