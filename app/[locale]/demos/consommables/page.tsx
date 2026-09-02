import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { featureFlags } from "@/lib/feature-flags";
import { ConsommablesApp } from "@/components/demos/ConsommablesApp";
import type { Locale } from "@/i18n/routing";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DemoConsommables" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: pageAlternates(locale as Locale, "/demos/consommables"),
  };
}

export default async function ConsommablesDemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Demos are gated behind a feature flag and 404 cleanly when off — never a
  // "coming soon" placeholder (PRD §11.2). Checked before any translation
  // lookup so a disabled demo does no unnecessary work.
  if (!featureFlags.demoConsommables) {
    notFound();
  }

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DemoConsommables" });

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")}>
      <ConsommablesApp />
    </Section>
  );
}
