import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Rule } from "@/components/ui/Rule";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/home/Hero";
import { OrgLogo } from "@/components/ui/OrgLogo";
import { ProjectRow } from "@/components/case/ProjectRow";
import { HomeSkillsGrid } from "@/components/home/HomeSkillsGrid";
import { getAllCaseStudies } from "@/lib/content";
import { ORGANISATIONS } from "@/lib/organisations";
import type { Locale } from "@/i18n/routing";
import type { CaseStudy } from "@/lib/schema";

const STELLANTIS_SLUG = "stellantis-maitrise-cout-transformation";
const AIC_SLUG = "aic-diagnostic-pliage-cintrage";

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

      {/* Organisations — a credibility strip with real logos (confirmed
          2026-08-28, supersedes the earlier no-raster-logo scoping in
          docs/tasks.md), grayscale at rest / colour on hover, each linking out
          to the organisation's own site. The case-study link for Stellantis/AIC
          already lives in Parcours, so this strip stays focused on "who I
          worked with", not "read more". */}
      <section className="mx-auto w-full max-w-[1200px] px-4 py-4 sm:px-6">
        <p className="mb-3 font-data text-xs uppercase tracking-wide text-steel">
          {t("organisations_eyebrow")}
        </p>

        <Reveal stagger className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {ORGANISATIONS.map((org) => (
            <OrgLogo
              key={org.name}
              organisation={org}
              officialSiteLabel={t("organisations_official_site")}
            />
          ))}
        </Reveal>

      </section>

      <Rule />

      {/* About — first-person background blurb, replaces the Proof Points stat
          bar (2026-09-01). Two paragraph groups split by a rule: who I am /
          what I'm looking for, then the internships / Stellantis contribution /
          tools I've built. Eyebrow + short title and inline <b> emphasis on
          key facts (roles, organisations, headline figures) reuse the
          sitewide Section eyebrow convention and the prose-article `strong`
          weight (500 — IBM Plex Sans ships no 700 file) instead of a one-off
          font, so the scan-friendly layout doesn't cost the token system. */}
      <Section eyebrow={t("about_eyebrow")} title={t("about_title")}>
        <Reveal stagger className="measure flex flex-col gap-4 text-sm text-graphite">
          <p>{t.rich("about_p1", { b: (chunks) => <strong className="font-medium text-ink">{chunks}</strong> })}</p>
          <p>{t.rich("about_p2", { b: (chunks) => <strong className="font-medium text-ink">{chunks}</strong> })}</p>
          <Rule className="my-2" />
          <p>{t.rich("about_p3", { b: (chunks) => <strong className="font-medium text-ink">{chunks}</strong> })}</p>
          <p>{t.rich("about_p4", { b: (chunks) => <strong className="font-medium text-ink">{chunks}</strong> })}</p>
          <p>{t.rich("about_p5", { b: (chunks) => <strong className="font-medium text-ink">{chunks}</strong> })}</p>
        </Reveal>
      </Section>

      {/* Engineering Projects — 3 featured rows as of M7 (Méthodes + Conception +
          Digital, per PRD §4.4): the 3rd (conception) slot that was a tracked
          content gap through M2–M6 is now filled. Restyled 2026-09-01 from the
          ProjectCard grid to editorial image+text rows (ProjectRow, shared
          with /projets) per an explicit reference-screenshot request — see
          CLAUDE.md. */}
      <Section>
        <h2 className="font-editorial text-3xl text-ink sm:text-4xl">{t("projets_eyebrow")}</h2>
        <Reveal stagger className="mt-6 flex flex-col gap-8">
          {featured.map((cs: CaseStudy, i: number) => (
            <ProjectRow key={cs.slug} caseStudy={cs} ctaLabel={tProjets("card_cta")} reverse={i % 2 === 1} />
          ))}
        </Reveal>
        <Link
          href="/projets"
          className="group mt-4 inline-block text-sm text-graphite transition-colors hover:text-accent"
        >
          {t("projets_view_all")} <span className="cta-arrow">→</span>
        </Link>
      </Section>

      {/* Ce que je sais faire — 2026-09-02 restyle: 01–04 dark cards with a
          center portrait on desktop (HomeSkillsGrid), replacing the plain
          2-column evidence list. Layout only borrowed from a reference site
          per explicit request; colors/type/radii stay in the token system —
          see CLAUDE.md. Data (`competences`, built above from the same
          Home.competence_* keys as before) is unchanged, just re-rendered. */}
      <Section title={t("competences_eyebrow")}>
        <Reveal>
          <HomeSkillsGrid
            items={competences}
            photoSrc="/images/profile-cutout.png"
            photoAlt={t("home_photo_alt")}
          />
        </Reveal>
      </Section>

      {/* Parcours condensé — reverse-chronological, links to /parcours (built
          by a parallel workstream). */}
      <Section title={t("parcours_eyebrow")}>
        <Reveal stagger as="ol" className="flex flex-col gap-4">
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
              <li
                key={item.organisation}
                className={`border-l-2 border-rule pl-4 transition-colors ${
                  item.slug ? "hover:border-l-accent" : ""
                }`}
              >
                {item.slug ? (
                  <Link href={`/projets/${item.slug}`} className="block">
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

      {/* Contact — compact summary; the full form lives on /contact (parallel
          workstream). */}
      <Section title={t("contact_eyebrow")}>
        <Reveal className="flex flex-col gap-2 text-sm text-graphite">
          <p className="font-data text-ink">{t("contact_availability")}</p>
          <p>{t("contact_location")}</p>
          <p>{t("contact_mobility")}</p>
          <a
            href="mailto:badrbouamri4@gmail.com"
            className="font-data transition-colors hover:text-accent"
          >
            badrbouamri4@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/badr-eddine-elbouamri/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-data transition-colors hover:text-accent"
          >
            {t("contact_linkedin_label")}
          </a>
        </Reveal>
        <Link
          href="/contact"
          className="group mt-4 inline-block text-sm text-accent transition-colors hover:text-ink"
        >
          {t("contact_cta")} <span className="cta-arrow">→</span>
        </Link>
      </Section>
    </>
  );
}
