import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Rule } from "@/components/ui/Rule";
import type { Locale } from "@/i18n/routing";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale as Locale, "/mentions-legales") };
}

export default async function MentionsLegalesPage() {
  const t = await getTranslations("Legal");

  const blocks = [
    { heading: t("identity_heading"), text: t("identity_text") },
    { heading: t("anonymisation_heading"), text: t("anonymisation_text") },
    { heading: t("analytics_heading"), text: t("analytics_text") },
    { heading: t("contact_data_heading"), text: t("contact_data_text") },
    { heading: t("rights_heading"), text: t("rights_text") },
  ];

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")}>
      <div className="flex flex-col gap-6 measure">
        {blocks.map((block, index) => (
          <div key={block.heading}>
            {index > 0 ? <Rule className="mb-6" /> : null}
            <h2 className="text-h3 mb-2 text-ink">{block.heading}</h2>
            <p className="text-sm text-graphite">{block.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
