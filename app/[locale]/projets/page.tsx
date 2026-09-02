import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllCaseStudies } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/ui/Section";
import { ProjectsHeroBand } from "@/components/case/ProjectsHeroBand";
import { ProjectsExplorer } from "./_components/ProjectsExplorer";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale as Locale, "/projets") };
}

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
        {/* Visually hidden — fixes a heading-order gap (h1 → h3, no h2
            between the hero band's title and each ProjectCard's title):
            a real, if pre-existing, accessibility issue caught by a
            Lighthouse pass in Phase 8. No visible h2 needed here; the grid
            itself is the page's only real content. */}
        <h2 className="sr-only">{t("results_heading")}</h2>
        <Suspense fallback={null}>
          <ProjectsExplorer caseStudies={caseStudies} />
        </Suspense>
      </Section>
    </>
  );
}
