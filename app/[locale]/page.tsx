import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Rule } from "@/components/ui/Rule";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/home/Hero";
import { LogoRail } from "@/components/ui/LogoRail";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { CaseStudyFeature } from "@/components/home/CaseStudyFeature";
import { CompetenceList } from "@/components/home/CompetenceList";
import { getAllCaseStudies } from "@/lib/content";
import { ORGANISATIONS } from "@/lib/organisations";
import type { Locale } from "@/i18n/routing";
import { pageAlternates } from "@/lib/seo";

const STELLANTIS_SLUG = "stellantis-maitrise-cout-transformation";
const AIC_SLUG = "aic-diagnostic-pliage-cintrage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale as Locale, "") };
}

export default function HomePage() {
  const t = useTranslations("Home");
  const tProjets = useTranslations("Projets");
  const locale = useLocale() as Locale;

  const caseStudies = getAllCaseStudies(locale);
  const featured = caseStudies.filter((cs) => cs.featured).slice(0, 3);
  const stellantis = caseStudies.find((cs) => cs.slug === STELLANTIS_SLUG);
  const aic = caseStudies.find((cs) => cs.slug === AIC_SLUG);

  const competences = [
    {
      titre: t("competence_methodes_titre"),
      evidence: t("competence_methodes_evidence"),
      slug: STELLANTIS_SLUG,
    },
    {
      titre: t("competence_ac_titre"),
      evidence: t("competence_ac_evidence"),
      slug: STELLANTIS_SLUG,
    },
    {
      titre: t("competence_maintenance_titre"),
      evidence: t("competence_maintenance_evidence"),
      slug: AIC_SLUG,
    },
    {
      titre: t("competence_donnees_titre"),
      evidence: t("competence_donnees_evidence"),
      slug: STELLANTIS_SLUG,
    },
  ];

  const timeline: {
    organisation: string;
    role: string;
    period: string;
    slug: string | null;
  }[] = [
    {
      organisation: "Stellantis",
      role: t("parcours_role_stellantis"),
      period: stellantis ? `${stellantis.period.start} → ${stellantis.period.end}` : "2026-02 → 2026-07",
      slug: stellantis ? STELLANTIS_SLUG : null,
    },
    {
      organisation: "AIC Métallurgie (Delta Holding)",
      role: t("parcours_role_aic"),
      period: aic ? `${aic.period.start} → ${aic.period.end}` : "2025-06 → 2025-07",
      slug: aic ? AIC_SLUG : null,
    },
    {
      organisation: "Nexteer Automotive",
      role: t("parcours_role_nexteer"),
      period: "2024-06",
      slug: null,
    },
  ];

  return (
    <>
      {/* Redesign Phase 4 (BRIEF §4.1 Bloc 1 + §5.2): full-height centered
          hero with the site's one authored entrance sequence, replacing the
          old CoverBanner (side-by-side name/credential/portrait strip) and
          the leftover thin divider section beneath it. */}
      <Hero />

      {/* Bloc 2 — LogoRail (BRIEF §3/§5.7): continuous marquee of host-
          organisation logos, replacing the static wrap-flex row. */}
      <Section>
        <p className="font-data text-label mb-4 uppercase text-steel">{t("organisations_eyebrow")}</p>
        <LogoRail organisations={ORGANISATIONS} officialSiteLabel={t("organisations_official_site")} />
      </Section>

      <Rule />

      {/* Bloc 3 — Note de positionnement (BRIEF §4.1): a single lead
          paragraph in a 7-of-12 column offset by 2, plus the availability
          line. Reuses the existing about_p1 string (already opens "Je suis
          ingénieur d'État…") and contact_mobility rather than new content —
          the fuller 5-paragraph About narrative this replaces on the
          homepage stays available via /parcours. Owner request, 2026-09-02:
          `tight` section padding (too much empty space around one short
          paragraph) and text-lg instead of text-lead (bigger, more
          confident opening statement). */}
      <Section tight>
        <div className="grid grid-cols-1 sm:grid-cols-12">
          <div className="sm:col-span-7 sm:col-start-3">
            <p className="text-lg text-ink">
              {t.rich("about_p1", { b: (chunks) => <strong className="font-medium text-ink">{chunks}</strong> })}
            </p>
            <p className="font-data mt-4 text-[13px] text-accent">{t("contact_mobility")}</p>
          </div>
        </div>
      </Section>

      {/* Bloc 4 — Projets en vedette (BRIEF §4.1): asymmetric 6/3/3 card
          grid, replacing ProjectRow on the homepage only (ProjectRow stays
          in place for /projets until Phase 6). No numbering — order carries
          no sequence here. */}
      <Section>
        <Reveal sweep>
          <SectionLabel as="h2">{t("featured_eyebrow")}</SectionLabel>
        </Reveal>
        <div className="mt-6">
          <FeaturedProjects
            featured={featured}
            featuredSlug={STELLANTIS_SLUG}
            categoryLabel={(category) => tProjets(`category_${category}`)}
            ctaLabel={tProjets("card_cta")}
          />
        </div>
        <Link
          href="/projets"
          className="group mt-6 inline-block text-sm text-graphite transition-colors hover:text-accent"
        >
          {t("projets_view_all")} <span className="cta-arrow">→</span>
        </Link>
      </Section>

      {/* Bloc 5 — Étude de cas Stellantis, pleine largeur (BRIEF §4.1). */}
      {stellantis ? (
        <Section>
          <CaseStudyFeature caseStudy={stellantis} eyebrow={t("case_study_eyebrow")} ctaLabel={t("read_case_study")} />
        </Section>
      ) : null}

      {/* Bloc 6 — Compétences (BRIEF §4.1): a list, not cards — see
          CompetenceList.tsx. Data unchanged from the previous HomeSkillsGrid
          rendering, same Home.competence_* keys. */}
      <Section title={t("competences_eyebrow")}>
        <CompetenceList items={competences} />
      </Section>

      {/* Bloc 7 — Parcours (aperçu), BRIEF §4.1: numbered-by-sequence
          timeline — a vertical rule per entry with a 7px accent pastille,
          not literal 01/02/03 digits (the dots already carry the sequence
          the brief's numbering rule is about). */}
      <Section title={t("parcours_eyebrow")}>
        <Reveal stagger as="ol" className="flex flex-col gap-6">
          {timeline.map((item) => {
            const body = (
              <>
                <p className="font-data text-xs uppercase tracking-wide text-steel">{item.period}</p>
                <h3 className="text-h3 mt-1 text-ink">{item.role}</h3>
                <p className="text-steel">{item.organisation}</p>
              </>
            );
            return (
              <li key={item.organisation} className="relative border-l border-rule pl-6">
                <span aria-hidden className="absolute -left-[4px] top-1.5 h-[7px] w-[7px] rounded-full bg-accent" />
                {item.slug ? (
                  <Link href={`/projets/${item.slug}`} className="group block">
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </Reveal>
        <Link
          href="/parcours"
          className="group mt-4 inline-block text-sm text-graphite transition-colors hover:text-accent"
        >
          {t("parcours_view_all")} <span className="cta-arrow">→</span>
        </Link>
      </Section>

      {/* Bloc 8 — Contact (BRIEF §4.1): distinct section background
          (--surface, the token-system equivalent of the brief's --ink-700
          "one step lighter than page bg"), three-column coordinates, solid
          CTA. */}
      <div className="bg-surface">
        <Section eyebrow={t("availability_eyebrow")}>
          <Reveal>
            <h2 className="text-h2 font-display text-ink">{t("availability_title")}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <p className="font-data text-xs uppercase tracking-wide text-steel">
                  {t("availability_location_label")}
                </p>
                <p className="mt-1 text-ink">{t("contact_location")}</p>
              </div>
              <div>
                <p className="font-data text-xs uppercase tracking-wide text-steel">
                  {t("availability_mobility_label")}
                </p>
                <p className="mt-1 text-ink">{t("contact_mobility")}</p>
              </div>
              <div>
                <p className="font-data text-xs uppercase tracking-wide text-steel">
                  {t("availability_email_label")}
                </p>
                <a
                  href="mailto:badrbouamri4@gmail.com"
                  className="font-data mt-1 block text-ink transition-colors hover:text-accent"
                >
                  badrbouamri4@gmail.com
                </a>
              </div>
            </div>
            <Button href="/contact" variant="solid" className="mt-8">
              {t("contact_cta")}
            </Button>
          </Reveal>
        </Section>
      </div>
    </>
  );
}
