import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getAllCaseStudies } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Rule } from "@/components/ui/Rule";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { findOrganisation } from "@/lib/organisations";

// Biography is a reviewed human translation per locale (content/fr/biographie.md,
// content/en/biographie.md) — read at build time and rendered as-is, never paraphrased.
function readBiographyParagraphs(locale: string): string[] {
  const filePath = path.join(process.cwd(), "content", locale, "biographie.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const body = raw.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
  return body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

type ExperienceEntry = {
  role: string;
  organisation: string;
  location?: string;
  period: string;
  sortKey: string;
  description?: string;
  href?: string;
};

const EDUCATION_KEYS = [
  { label: "edu_1_label", institution: "edu_1_institution", period: "edu_1_period" },
  { label: "edu_2_label", institution: "edu_2_institution", period: "edu_2_period" },
  { label: "edu_3_label", institution: "edu_3_institution", period: "edu_3_period" },
] as const;

const CERTIFICATION_KEYS = [
  { label: "cert_1_label", institution: "cert_1_institution", period: "cert_1_period" },
  { label: "cert_2_label", institution: "cert_2_institution", period: "cert_2_period" },
  { label: "cert_3_label", institution: "cert_3_institution", period: "cert_3_period" },
] as const;

export default async function ParcoursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Parcours");

  const bioParagraphs = readBiographyParagraphs(locale);

  // Experience is sourced from the case study frontmatter in the current locale.
  // "Projet personnel"/"Personal project" entries (the IoT irrigation project) and
  // "Projet académique"/"Academic project" entries (ENSET group coursework) are not
  // work experience and are excluded here; they live on the Projets index /
  // Compétences evidence links instead. Nexteer Automotive (Juin 2024) is excluded
  // too — no case study for it, and not shown as a standalone Experience entry.
  const NON_EXPERIENCE_ORGANISATIONS = [
    "Projet personnel",
    "Personal project",
    "Projet académique — ENSET Mohammedia",
    "Academic project — ENSET Mohammedia",
  ];

  const experience: ExperienceEntry[] = getAllCaseStudies(locale as Locale)
    .filter((cs) => !NON_EXPERIENCE_ORGANISATIONS.includes(cs.organisation))
    .map((cs) => ({
      role: cs.role,
      organisation: cs.organisation,
      location: cs.location,
      period: `${cs.period.start} → ${cs.period.end}`,
      sortKey: cs.period.start,
      description: cs.summary,
      href: `/projets/${cs.slug}`,
    }))
    .sort((a, b) => b.sortKey.localeCompare(a.sortKey));

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_220px]">
        <div>
          <h2 className="text-h3 mb-3 text-ink">{t("bio_heading")}</h2>
          <div className="measure text-graphite">
            {bioParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="order-first sm:order-last">
          <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden border border-rule bg-surface">
            <Image
              src="/images/profile.jpg"
              alt={t("photo_alt")}
              fill
              sizes="220px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <Rule className="my-8" />

      <div>
        <h2 className="text-h3 mb-4 text-ink">{t("experience_heading")}</h2>
        <Reveal stagger as="ul" className="flex flex-col gap-6">
          {experience.map((entry) => {
            const org = findOrganisation(entry.organisation);
            return (
            <li
              key={`${entry.organisation}-${entry.sortKey}`}
              className="relative border-l border-rule pl-6"
            >
              <span aria-hidden className="absolute -left-[4px] top-1.5 h-[7px] w-[7px] rounded-full bg-accent" />
              <div className="flex items-start justify-between gap-3">
                <p className="font-data text-xs uppercase tracking-wide text-steel">
                  {entry.period}
                </p>
                {org ? (
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${org.name} — ${t("experience_official_site")}`}
                    className="shrink-0 grayscale opacity-70 transition-[filter,opacity] duration-200 hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0"
                  >
                    <Image
                      src={org.logo.src}
                      alt=""
                      width={org.logo.width}
                      height={org.logo.height}
                      className="h-6 w-auto object-contain"
                    />
                  </a>
                ) : null}
              </div>
              <p className="text-base text-ink">
                {entry.role} — {entry.organisation}
                {entry.location ? `, ${entry.location}` : ""}
              </p>
              {entry.description ? (
                <p className="mt-1 text-sm text-graphite">{entry.description}</p>
              ) : null}
              {entry.href ? (
                <Link
                  href={entry.href}
                  className="mt-1 inline-block text-sm text-accent hover:underline"
                >
                  {t("experience_case_study_link")}
                </Link>
              ) : null}
            </li>
            );
          })}
        </Reveal>

        <div className="mt-6 border-l border-rule pl-6">
          <h3 className="mb-2 font-data text-xs uppercase tracking-wide text-steel">
            {t("engagements_heading")}
          </h3>
          <p className="text-sm text-graphite">{t("engagement_catia")}</p>
        </div>
      </div>

      <Rule className="my-8" />

      <div>
        <h2 className="text-h3 mb-4 text-ink">{t("education_heading")}</h2>
        <Reveal stagger as="ul" className="flex flex-col gap-4">
          {EDUCATION_KEYS.map((edu) => (
            <li key={edu.label} className="relative border-l border-rule pl-6">
              <span aria-hidden className="absolute -left-[4px] top-1.5 h-[7px] w-[7px] rounded-full bg-accent" />
              <p className="font-data text-xs uppercase tracking-wide text-steel">
                {t(edu.period)}
              </p>
              <p className="text-base text-ink">{t(edu.label)}</p>
              <p className="text-sm text-graphite">{t(edu.institution)}</p>
            </li>
          ))}
        </Reveal>
      </div>

      <Rule className="my-8" />

      <div>
        <h2 className="text-h3 mb-4 text-ink">{t("certifications_heading")}</h2>
        <Reveal stagger as="ul" className="flex flex-col gap-4">
          {CERTIFICATION_KEYS.map((cert) => (
            <li key={cert.label} className="relative border-l border-rule pl-6">
              <span aria-hidden className="absolute -left-[4px] top-1.5 h-[7px] w-[7px] rounded-full bg-accent" />
              <p className="font-data text-xs uppercase tracking-wide text-steel">
                {t(cert.period)}
              </p>
              <p className="text-base text-ink">{t(cert.label)}</p>
              <p className="text-sm text-graphite">{t(cert.institution)}</p>
            </li>
          ))}
        </Reveal>
      </div>

      <Rule className="my-8" />

      <div>
        <h2 className="text-h3 mb-3 text-ink">{t("languages_heading")}</h2>
        <Reveal stagger className="flex flex-wrap gap-2">
          <Tag>
            {t("lang_arabic")} — {t("lang_arabic_level")}
          </Tag>
          <Tag>
            {t("lang_french")} — {t("lang_french_level")}
          </Tag>
          <Tag>
            {t("lang_english")} — {t("lang_english_level")}
          </Tag>
        </Reveal>
      </div>

      <Rule className="my-8" />

      <div>
        <h2 className="text-h3 mb-2 text-ink">{t("availability_heading")}</h2>
        <p className="text-sm text-graphite">{t("location_text")}</p>
        <p className="text-sm text-graphite">{t("availability_text")}</p>
      </div>
    </Section>
  );
}
