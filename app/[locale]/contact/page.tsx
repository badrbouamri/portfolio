import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Rule } from "@/components/ui/Rule";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Locale } from "@/i18n/routing";
import { ContactForm } from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("page_title"),
    description: t("page_intro"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <Section>
      <Reveal sweep>
        <SectionLabel className="mb-2">{t("page_eyebrow")}</SectionLabel>
      </Reveal>
      <Reveal>
        <h1 className="text-h2 font-display mb-4 text-ink">{t("page_title")}</h1>
      </Reveal>
      <Reveal>
        <p className="measure mb-8 text-graphite">{t("page_intro")}</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,280px)_1fr]">
        {/* Direct contact details render unconditionally as plain server-rendered
            markup — no client-only gating — so they're always available even
            if the form's JS fails to load (PRD §5.8: many recruiters won't use
            a form at all). Reveal only ever hides content once .js-reveal is
            confirmed present (see Reveal.tsx), so this stays true with motion on. */}
        <Reveal stagger as="div">
          <h2 className="text-h3 mb-4 text-ink">{t("details_heading")}</h2>
          <dl className="flex flex-col gap-4 text-sm">
            <div>
              <dt className="text-steel">{t("email_label")}</dt>
              <dd>
                <a href="mailto:badrbouamri4@gmail.com" className="font-data text-accent hover:underline">
                  badrbouamri4@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-steel">{t("phone_label")}</dt>
              <dd>
                <a href="tel:+212604159702" className="font-data text-accent hover:underline">
                  +212 6 04 15 97 02
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-steel">{t("linkedin_label")}</dt>
              <dd>
                <a
                  href="https://www.linkedin.com/in/badr-eddine-elbouamri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  BadrEddine Elbouamri
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-steel">{t("location_label")}</dt>
              <dd className="font-data text-ink">{t("location_value")}</dd>
            </div>
          </dl>
        </Reveal>

        <div>
          <Rule className="mb-8 md:hidden" />
          <h2 className="text-h3 mb-4 text-ink">{t("form_heading")}</h2>
          <ContactForm locale={locale as Locale} />
        </div>
      </div>
    </Section>
  );
}
