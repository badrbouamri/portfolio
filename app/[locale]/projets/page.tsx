import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getAllCaseStudies } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
import { ProjectsHeroBand } from "@/components/case/ProjectsHeroBand";
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
    <>
      <ProjectsHeroBand title={t("title")} intro={t("intro")} />

      <Section>
        <Suspense fallback={null}>
          <ProjectsExplorer caseStudies={caseStudies} />
        </Suspense>
      </Section>
    </>
  );
}
