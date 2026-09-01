# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are recruiters and engineers screening Badr Eddine ELBOUAMRI for entry-level Manufacturing/Industrial Engineer roles in Moroccan automotive/industrial companies, ranked by influence on the hiring outcome:

1. **Responsable/Chef de service Méthodes** (35–50, French-speaking engineer) — sent the link before/during an interview or from the CV; spends 3–8 min looking for evidence of real deliverables (a layout, a work standard, a structured problem-solving approach).
2. **Chargé(e) de recrutement / HR** (25–40, non-technical, screening volume) — arrives via LinkedIn, on mobile, one thumb, 20–60 s; needs instant clarity on who this is, what role, what school, seriousness, and where the CV is.
3. **Cabinet de recrutement** (Michael Page, Rekrute, LinkedIn recruiters) — sourcing for a client brief, 1–3 min, needs keyword match, availability, mobility, downloadable CV.
4. **Ingénieur Méthodes/Amélioration Continue peer** (future colleague on the panel) — 5–15 min, vets technical depth: does the AMDEC logic hold, does the Pareto make sense, is the dashboard real work.
5. **Responsable Production/Plant Manager** — final round, 2–5 min, wants business impact and pragmatism over method vocabulary.
6. **Professional network / ENSET alumni** — LinkedIn sharing, 1–2 min, looks for something worth sharing.

Personas 1 and 2 have opposite needs (depth vs. speed) and are the central design tension: the homepage serves persona 2, case studies serve persona 1 — never compromise one for the other, layer them.

## Product Purpose

A fast, sober, bilingual (FR/EN) professional portfolio that converts a recruiter's 30-second glance into a 3-minute read, and gives an engineering manager concrete material to interrogate during an interview. It exists to secure a first engineering position in Moroccan automotive/industrial manufacturing, positioned as **Ingénieur Méthodes & Industrialisation**, with Lean/continuous improvement as proven secondary competence and digital/Industry 4.0 capability as the differentiator.

Success: a recruiter downloads the CV and remembers the name (persona 2); a Méthodes manager arrives at interview with a specific question about a case study (persona 1); a technical peer concludes the digital claim is real by using a working demo (persona 4).

## Positioning

> A mechanical engineer who masters the shop floor and builds the tools that run it.

Three-part claim, each provable on the site:
1. **Méthodes credibility** — personally produced workstation layouts and work standards/gammes in an automotive plant (Stellantis).
2. **Lean rigour** — full DMAIC deployment with a quantified result (−33.8% scrap cost).
3. **Digital capability** — builds Power BI dashboards, web applications, and IoT systems himself, with live demos to prove it.

Point 3 is the scarcity value: points 1–2 make him hireable, point 3 makes him memorable. A neighboring "generic mechanical engineer" portfolio could not truthfully copy point 3, backed by working, self-built demos rather than claims.

**Explicit non-goals:** not an application channel (applications go through ATS/LinkedIn/cabinets/referrals); not a blog-first personal brand play; not a showcase of pure Bureau d'Études/CAD design capability; never publishes any Stellantis, AIC Métallurgie, or Nexteer proprietary data.

## Operating Context

- **Professional identity:** Ingénieur d'État en Génie Mécanique des Systèmes Industriels (ENSET Mohammedia, Université Hassan II, 2026).
- **Specialisation:** Primary — Méthodes & Industrialisation (gammes, standards de travail, implantation de poste, maîtrise des procédés, suivi par KPIs). Secondary — Amélioration Continue/Lean Six Sigma (DMAIC, AMDEC, Pareto, Ishikawa, 5 Pourquoi, QQOQCCP, SIPOC, 8D, Kaizen, 5S). Tertiary — Maintenance & Fiabilité. Differentiator — Industrialisation numérique (Power BI, web dev, Python, IoT).
- **Target industries:** Automotive OEM & tier-1 (Stellantis Kénitra, Renault Tanger/Casablanca, Nexteer, Lear, Yazaki, Aptiv, Sumitomo, Valeo, Denso, Faurecia); métallurgie/transformation métallique; aéronautique; agro-industrie (secondary). Geography: Kénitra–Rabat–Casablanca–Tanger corridor; mobility stated explicitly on the site.
- **Career horizon stated on-site:** 0–6 months, first CDI/CDD as Ingénieur Méthodes/Industrialisation/Amélioration Continue. Longer horizon (2–3 years, 5 years) kept for interviews, not published.
- **Case studies are the core content unit.** Every one follows a fixed, non-reorderable 12-block skeleton (cartouche, Contexte, Problématique, Objectifs, Mon rôle, Démarche, Outils, Analyse d'ingénieur, Difficultés, Solutions, Résultats, Enseignements) validated against a Zod frontmatter schema. Reordering the skeleton per-project breaks the skimmability persona 1 relies on.
- **Confidentiality is load-bearing.** Industrial case studies (Stellantis, AIC, Nexteer) never publish absolute costs, production volumes, internal document screenshots, real part references, supplier names, photographs of lines/postes/robotised cells, real-data Power BI screenshots, or internal codenames. Safe to publish: methodology, reasoning, relative/indexed results, redrawn generic schematics, rebuilt dashboards with synthetic data. Every industrial case study carries the standard indexation/anonymisation notice.
- **Demos are evidence, not nav destinations** — reached from within case studies (`/fr/demos/[slug]`), never from the main header, and never shipped half-finished (a not-ready demo stays behind a feature flag).

## Capabilities and Constraints

- Static content site: no database, no auth, no user accounts. Content lives in-repo as MDX; git is the CMS.
- Bilingual FR (default, source-of-truth)/EN (reviewed translation, never machine-translated as-is), locale-prefixed routing.
- Navigation is capped at 6 header items plus language toggle and a CV action: Accueil, Parcours, Compétences, Projets, Contact, CV (direct tracked PDF download, not a page).
- Two live interactive demos (consommables stock management; scrap/rebut pilotage dashboard) rebuilt from scratch with the visitor's own code and synthetic data — never the original internship source code, which is employer property. An optional 3D CAD viewer is conditional on meeting a strict performance budget (<3MB Draco-compressed, lazy-loaded); ship a static render instead if it can't meet budget.
- Contact form (nom/email/organisation/message) with honeypot, rate limit, Zod validation via Resend — always alongside, never instead of, plain-text email/phone/LinkedIn/location, since many recruiters won't use a form.
- Performance budget is enforced, not aspirational: Lighthouse mobile ≥95 on Performance/Accessibility/Best Practices/SEO; LCP <2.0s on simulated 4G; CLS <0.05; INP <200ms; initial JS <150KB gzipped on the homepage.
- Dark mode explicitly deferred (V2) — the sober light identity is the brand, and dark mode doubles design QA for no hiring-relevant value. A blog is deferred until employed. An AI chatbot about the profile and appointment scheduling are rejected outright (see Product Principles).
- Terminology: *gamme* = routing/process sheet, *rebut* = scrap — FR is authoritative, EN is a reviewed mapping, not literal translation.

## Brand Commitments

- **Name/title:** Badr Eddine ELBOUAMRI — Ingénieur Méthodes & Industrialisation. Site title: "Badr Eddine ELBOUAMRI — Ingénieur Méthodes & Industrialisation."
- **Locked homepage headline (FR):** "Badr Eddine ELBOUAMRI / Ingénieur d'État en Génie Mécanique des Systèmes Industriels — ENSET Mohammedia / Méthodes & Industrialisation · Lean Manufacturing · Industrie 4.0 / J'optimise les process de production industrielle — de la définition des gammes et des postes au pilotage par la donnée." EN mirror is a reviewed translation, not literal.
- **Voice:** professional, direct, factual, first person singular. No superlatives, no "passionate about excellence," no marketing adjectives. Every claim followed by evidence or a number; where a number is confidential, say so plainly — restraint reads as maturity.
- **Personal brand attributes:** rigorous, method-driven, quantitative, pragmatic, hands-on, curious about digital tools, discreet with confidential data.
- **Anti-brand (must never look like):** student project, agency template, AI-generated startup landing page, over-designed showreel.
- **Copy rules:** sentence case everywhere including buttons; actions name their outcome ("Télécharger le CV," not "Cliquez ici"); empty/error states give direction, not apology.
- **No percentage/skill bars, no decorative sequence numbering on non-sequential content** (numbering is reserved for genuinely sequential content like DMAIC phases or 8D steps), **no marketing adjectives without an evidence link.**

## Evidence on Hand

- Full PRD at `docs/PRD_Portfolio_Badr_Eddine_ELBOUAMRI.md` (v1.0, approved) — source of truth for design tokens, content structure, and copy rules; read the relevant section before building a related feature.
- Milestone checklist at `docs/tasks.md`, tracking M0–M7 against the PRD's roadmap.
- 8 published FR case studies (6 EN) across all 5 categories under `content/{fr,en}/projets/*.mdx`: Stellantis (methodes+lean, flagship, confidentiality-cleared 2026-08-23), AIC diagnostic (maintenance), irrigation IoT (digital, personal), gestion-consommables (digital, paired with a live demo), Nexteer CNC optimisation (lean, deliberately thin/honest), CATIA V5 conception, steam-turbine thermodynamic study (conception), AMDEC injection-plastique diagnostic (maintenance).
- Two live demos built and verified: consommables stock app and scrap/rebut pilotage dashboard (Pareto, trend, shift/station breakdown) with synthetic, plausible data. Both behind feature flags (`NEXT_PUBLIC_DEMO_CONSOMMABLES`, `NEXT_PUBLIC_DEMO_PILOTAGE`), off by default pending a real-device mobile pass.
- Real profile photo at `public/images/profile.jpg`. Per-case-study and site-wide OG images generated via `next/og`.
- Certifications published on Parcours: CATIA V5 Beginner to Advanced (Udemy, May 2025), Lean Six Sigma Foundations (LinkedIn Learning, Oct 2025), SOLIDWORKS 2024 Essential Training (LinkedIn Learning, Oct 2025).
- **Known open gaps (do not fabricate to fill):** CV PDFs not yet assembled; several case studies (Stellantis, AIC, Nexteer) have placeholder "Analyse d'ingénieur"/"Difficultés"/"Résultats" sections pending the PFE/PFA report; `/mentions-legales` exists but SEO metadata/sitemap/JSON-LD/analytics wiring is only partially done; no custom domain yet (site runs on `*.vercel.app`); francophone third-party proofread not done; real screen-reader pass (NVDA/VoiceOver) not done, only Lighthouse/axe-core substitutes.
- New in-progress work (uncommitted at time of writing): a `CoverBanner` component and a new `cover.jpg`, plus source material for a Shifter Kart case study (`docs/prj/Shifter-Kart-Badr-Eddine-ELBOUAMRI.pdf`) — homepage and case-study page templates are mid-edit to accommodate it.

## Product Principles

1. **Evidence over claims.** Every assertion of skill or result links to a case study, a number, or a working demo — never an unfalsifiable bar chart or adjective.
2. **Two audiences, layered, never compromised.** The 30-second scan (HR/mobile) and the 5-minute technical read (Méthodes manager/desktop) are both served by the same pages at different depths, not by separate simplified/detailed versions.
3. **Confidentiality is a hard constraint, not a design choice.** When real data can't be shown, say so plainly and show indexed/relative/synthetic data instead — never omit silently, never fabricate.
4. **Restraint signals seniority.** No feature, animation, or visual flourish ships unless it serves the persuasion goal for personas 1–3; effort goes into skimmability, precision, and honesty over polish-for-its-own-sake.
5. **Ship honest gaps, not fake completeness.** An unfinished section states its status openly (e.g., certifications empty state, placeholder-tagged analysis sections) rather than being padded or hidden.

## Accessibility & Inclusion

WCAG 2.1 AA. Text contrast ≥4.5:1 (`--steel` on `--paper`/`--surface` requires care at small sizes). Visible focus rings. Full keyboard navigation. Semantic landmarks. `lang` attribute switches per locale. Alt text authored per-locale, never auto-generated. Charts carry an accessible data-table fallback. `prefers-reduced-motion: reduce` disables all motion.
