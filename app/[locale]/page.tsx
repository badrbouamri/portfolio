import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Rule } from "@/components/ui/Rule";
import { CvButton } from "@/components/layout/CvButton";
import { ProjectCard } from "@/app/[locale]/projets/_components/ProjectCard";
import { getAllCaseStudies } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import type { CaseStudy } from "@/lib/schema";

const STELLANTIS_SLUG = "stellantis-maitrise-cout-transformation";
const AIC_SLUG = "aic-diagnostic-pliage-cintrage";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-data text-2xl text-signal sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-graphite sm:text-sm">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations("Home");
  const locale = useLocale() as Locale;

  const caseStudies = getAllCaseStudies(locale);
  const featured = caseStudies.filter((cs) => cs.featured).slice(0, 3);
  const stellantis = caseStudies.find((cs) => cs.slug === STELLANTIS_SLUG);
  const aic = caseStudies.find((cs) => cs.slug === AIC_SLUG);

  const rebutValue = stellantis?.kpis[0]?.value ?? (locale === "fr" ? "−33,8 %" : "−33.8%");

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
      {/* Hero — a technical-drawing grid backdrop (--rule only, no new color)
          gives this more presence than a plain text block without borrowing
          the Cartouche's own title-block grid, which stays unique to case
          studies per CLAUDE.md. Still a compact custom container (not the
          default Section padding) so the value proposition clears the fold
          on a 390px-wide screen. */}
      <section className="hero-grid-bg border-b border-rule px-4 py-6 sm:px-6 sm:py-10">
        <div className="mx-auto w-full max-w-[1200px]">
          <h1 className="hero-reveal text-xl text-ink sm:text-3xl">{t("hero_name")}</h1>
          <p className="hero-reveal hero-reveal-2 mt-2 text-sm text-graphite sm:text-base">
            {t("hero_credential")}
          </p>
          <p className="hero-reveal hero-reveal-2 mt-1 font-data text-xs uppercase tracking-wide text-steel">
            {t("hero_positioning")}
          </p>
          <div className="hero-reveal hero-reveal-3 mt-3 h-px w-16 bg-accent" />
          <p className="hero-reveal hero-reveal-3 measure mt-3 text-sm text-ink sm:text-base">
            {t("hero_value")}
          </p>
          <div className="hero-reveal hero-reveal-4 mt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/projets"
              className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-accent px-4 py-2 text-sm font-medium text-surface transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t("hero_cta_projects")}
            </Link>
            <CvButton />
          </div>
        </div>
      </section>

      {/* Organisations — a credibility strip (PRD-safe: entity names only, no
          real logos/photos). Stellantis and AIC link to their case study;
          Nexteer and ENSET don't, matching the same rule already applied on
          /parcours (no case study exists for Nexteer). */}
      <section className="mx-auto w-full max-w-[1200px] px-4 py-4 sm:px-6">
        <p className="mb-3 font-data text-xs uppercase tracking-wide text-steel">
          {t("organisations_eyebrow")}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {[
            { label: "Stellantis", slug: STELLANTIS_SLUG },
            { label: "AIC Métallurgie", slug: AIC_SLUG },
            { label: "Nexteer Automotive", slug: null },
            { label: "ENSET Mohammedia", slug: null },
          ].map((org) =>
            org.slug ? (
              <Link
                key={org.label}
                href={`/projets/${org.slug}`}
                className="font-data text-sm uppercase tracking-wide text-steel transition-colors hover:text-accent"
              >
                {org.label}
              </Link>
            ) : (
              <span key={org.label} className="font-data text-sm uppercase tracking-wide text-steel">
                {org.label}
              </span>
            ),
          )}
        </div>
      </section>

      <Rule />

      {/* Preuves — three facts, deliberately not a slogan bar. Two columns on
          mobile so the whole block stays within the first viewport; the
          third fact (a sentence, not a bare stat) spans the full width. */}
      <section className="mx-auto w-full max-w-[1200px] px-4 py-4 sm:px-6 sm:py-8">
        <p className="mb-3 font-data text-xs uppercase tracking-wide text-steel">
          {t("preuves_eyebrow")}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          <Stat value={rebutValue} label={t("preuve_rebut_label")} />
          <Stat value="3" label={t("preuve_stages_label")} />
          <p className="col-span-2 text-sm text-graphite sm:col-span-1">
            <span className="font-data text-signal">1</span> {t("preuve_outils_app")}{" "}
            {t("preuve_outils_and")}{" "}
            <span className="font-data text-signal">1</span> {t("preuve_outils_dashboard")}{" "}
            {t("preuve_outils_suffix")}
          </p>
        </div>
      </section>

      {/* Projets en vedette — 3 featured cards as of M7 (Méthodes + Conception +
          Digital, per PRD §4.4): the 3rd (conception) slot that was a tracked
          content gap through M2–M6 is now filled. Reuses the same ProjectCard
          as /projets (tool chips included) instead of a separate, thinner
          inline card — one card design for the whole site. */}
      <Section title={t("projets_eyebrow")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((cs: CaseStudy) => (
            <ProjectCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
        <Link href="/projets" className="mt-4 inline-block text-sm text-graphite hover:text-accent">
          {t("projets_view_all")} →
        </Link>
      </Section>

      {/* Ce que je sais faire — four evidence-linked blocks, no numbering, no
          percentage bars. */}
      <Section title={t("competences_eyebrow")}>
        <div className="grid gap-6 sm:grid-cols-2">
          {competences.map((c) => (
            <div key={c.titre} className="border-t border-rule pt-4">
              <h3 className="text-md text-ink">{c.titre}</h3>
              <Link
                href={`/projets/${c.slug}`}
                className="mt-2 block text-sm text-graphite hover:text-accent"
              >
                {c.evidence} →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Parcours condensé — reverse-chronological, links to /parcours (built
          by a parallel workstream). */}
      <Section title={t("parcours_eyebrow")}>
        <ol className="flex flex-col gap-4">
          {timeline.map((item) => {
            const body = (
              <>
                <p className="font-data text-xs uppercase tracking-wide text-steel">
                  {item.period}
                </p>
                <p className="text-sm text-ink">
                  {item.role} — <span className="text-graphite">{item.organisation}</span>
                </p>
              </>
            );
            return (
              <li key={item.organisation} className="border-l-2 border-rule pl-4">
                {item.slug ? (
                  <Link href={`/projets/${item.slug}`} className="block hover:border-l-accent">
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ol>
        <Link href="/parcours" className="mt-4 inline-block text-sm text-graphite hover:text-accent">
          {t("parcours_view_all")} →
        </Link>
      </Section>

      {/* Contact — compact summary; the full form lives on /contact (parallel
          workstream). */}
      <Section title={t("contact_eyebrow")}>
        <div className="flex flex-col gap-2 text-sm text-graphite">
          <p className="font-data text-ink">{t("contact_availability")}</p>
          <p>{t("contact_location")}</p>
          <p>{t("contact_mobility")}</p>
          <a href="mailto:badrbouamri4@gmail.com" className="font-data hover:text-accent">
            badrbouamri4@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/badr-eddine-elbouamri/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-data hover:text-accent"
          >
            {t("contact_linkedin_label")}
          </a>
        </div>
        <Link href="/contact" className="mt-4 inline-block text-sm text-accent hover:text-ink">
          {t("contact_cta")} →
        </Link>
      </Section>
    </>
  );
}
