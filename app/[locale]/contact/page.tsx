import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Locale } from "@/i18n/routing";
import { pageAlternates } from "@/lib/seo";
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
    alternates: pageAlternates(locale as Locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const tHome = await getTranslations({ locale, namespace: "Home" });

  return (
    <Section>
      <Reveal sweep>
        <SectionLabel className="mb-2">{t("page_eyebrow")}</SectionLabel>
      </Reveal>
      <Reveal>
        <h1 className="font-display mb-4 text-4xl text-ink sm:text-6xl">{t("page_title")}</h1>
      </Reveal>
      <Reveal>
        <p className="measure mb-4 text-graphite">{t("page_intro")}</p>
      </Reveal>
      <Reveal>
        <span className="mb-10 inline-flex items-center gap-2 border border-rule px-3 py-1.5 text-xs text-graphite">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {tHome("contact_availability")}
        </span>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,300px)_1fr]">
        {/* Direct contact details render unconditionally as plain server-rendered
            markup — no client-only gating — so they're always available even
            if the form's JS fails to load (PRD §5.8: many recruiters won't use
            a form at all). Reveal only ever hides content once .js-reveal is
            confirmed present (see Reveal.tsx), so this stays true with motion on. */}
        <Reveal stagger as="div" className="flex flex-col gap-3">
          <h2 className="text-h3 mb-1 text-ink">{t("details_heading")}</h2>

          <a
            href="mailto:badrbouamri4@gmail.com"
            className="group flex flex-col gap-0.5 border border-rule p-4 transition-colors hover:border-accent"
          >
            <span className="font-data text-xs uppercase tracking-wide text-steel">{t("email_label")}</span>
            <span className="font-data text-sm text-ink transition-colors group-hover:text-accent">
              badrbouamri4@gmail.com
            </span>
          </a>

          <a
            href="tel:+212604159702"
            className="group flex flex-col gap-0.5 border border-rule p-4 transition-colors hover:border-accent"
          >
            <span className="font-data text-xs uppercase tracking-wide text-steel">{t("phone_label")}</span>
            <span className="font-data text-sm text-ink transition-colors group-hover:text-accent">
              +212 6 04 15 97 02
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/badr-eddine-elbouamri/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-0.5 border border-rule p-4 transition-colors hover:border-accent"
          >
            <span className="font-data text-xs uppercase tracking-wide text-steel">{t("linkedin_label")}</span>
            <span className="text-sm text-ink transition-colors group-hover:text-accent">BadrEddine Elbouamri</span>
          </a>

          <a
            href="https://github.com/badrbouamri"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-0.5 border border-rule p-4 transition-colors hover:border-accent"
          >
            <span className="font-data text-xs uppercase tracking-wide text-steel">{t("github_label")}</span>
            <span className="font-data text-sm text-ink transition-colors group-hover:text-accent">
              github.com/badrbouamri
            </span>
          </a>

          <div className="flex flex-col gap-0.5 border border-rule p-4">
            <span className="font-data text-xs uppercase tracking-wide text-steel">{t("location_label")}</span>
            <span className="font-data text-sm text-ink">{t("location_value")}</span>
          </div>
        </Reveal>

        <div>
          <h2 className="text-h3 mb-4 text-ink">{t("form_heading")}</h2>
          <ContactForm locale={locale as Locale} />
        </div>
      </div>
    </Section>
  );
}
