# Milestones — Portfolio Badr Eddine ELBOUAMRI

Derived from PRD v1.0. Each milestone has an exit criterion — do not start the next until the current one is met.

## M0 — Unblock (Days 1–3)
**Exit:** legal status known; repo deploying a placeholder.

- [x] Domain deferred — launching on `*.vercel.app` for now per PRD §1.1 (does not block launch); revisit purchase later
- [x] Create GitHub repo (remote: https://github.com/badrbouamri/portfolio.git) — initial commit pushed to `main`
- [ ] Connect repo to Vercel, confirm preview deployments work — **needs your Vercel account** (see below), not something I can do headless
- [x] Deploy placeholder page to confirm pipeline — `index.html` committed, deploys once Vercel is connected

## M1 — Content Core (Days 3–10)
**Exit:** 3 case studies complete in Markdown, offline (not yet in the site).

- [ ] Retrieve PFE report (drafts / encadrant / ENSET library) — source for case study 1
- [ ] Write professional biography, FR, 150–200 words (§10.1 structure)
- [ ] Write case study: `stellantis-maitrise-cout-transformation` (methodes + lean) to the 12-block skeleton (§6)
- [ ] Write case study: `aic-diagnostic-pliage-cintrage` (maintenance) to the 12-block skeleton
- [ ] Write 3rd case study — academic design/dimensionnement project (conception) or `irrigation-intelligente-iot` (digital)
- [ ] Apply confidentiality rules to each: anonymise costs/volumes/codenames, add the standard indexation notice
- [ ] Redraw figures per case study (Pareto, Ishikawa/AMDEC extract, layout, calculation) — no screenshots of internal docs
- [ ] Take/select professional photograph (current, neutral background)
- [ ] Assemble CV PDF, FR — filename `CV_ELBOUAMRI_BadrEddine_FR.pdf`, portfolio URL in header
- [ ] Assemble CV PDF, EN — `..._EN.pdf`

## M2 — Scaffold & Build (Days 8–16, overlaps M1)
**Exit:** all V1 pages rendering with real FR content.

- [ ] Scaffold Next.js 15 App Router + TypeScript strict
- [ ] Set up Tailwind v4 with design tokens from §8.2 in `@theme`
- [ ] Self-host fonts (IBM Plex Sans / Sans Condensed / Mono) via `next/font/local`
- [ ] Set up next-intl, locale-prefixed routing (`/fr` default, `/en`)
- [ ] Build layout shell: Header, Footer, LocaleSwitcher, CvButton
- [ ] Define Zod content schema (§6 frontmatter) in `/lib/schema.ts`
- [ ] Build MDX pipeline (`/content/fr/projets/*.mdx`, `/en/projets/*.mdx`), validate at build time
- [ ] Seed one case study through the pipeline end-to-end
- [ ] Build case study template + **Cartouche** component (§8.6)
- [ ] Build remaining case-block components: KpiRow, FigureBlock, MethodSteps, ToolChips, ConfidentialNotice
- [ ] Build Projets index: card grid + client-side filtering by category, URL-synced (`?categorie=`)
- [ ] Build Homepage: Hero, ProofBar (3 facts), FeaturedProjects (3 cards), CompetenceBlocks, MiniTimeline, Contact block (§4.4)
- [ ] Build Parcours page: bio, photo, experience timeline, education, certifications (empty for now), languages, availability (§5.2)
- [ ] Build Compétences page: 6 groups with one evidence line each, linked to case studies (§5.3)
- [ ] Build Contact page: form (nom/email/organisation/message) + honeypot + rate limit + Zod validation + Resend Server Action, plus plain-text email/phone/LinkedIn/location (§5.8)
- [ ] Build `/mentions-legales` page (§5.9)
- [ ] Wire CV download action: `/fr/cv` fires analytics event then redirects to PDF (never expose raw path in nav)
- [ ] Add SEO: per-locale metadata, hreflang alternates, `sitemap.ts`, JSON-LD Person schema
- [ ] Add OG images (`opengraph-image.tsx`)
- [ ] Add Vercel Web Analytics + Speed Insights, wire events: `cv_download`, `case_study_read`, `demo_opened`, `contact_submitted`, `locale_switched`
- [ ] Load real FR content (bio + 3 case studies from M1) into the site

## M3 — Bilingual (Days 14–18)
**Exit:** EN parity, no untranslated strings.

- [ ] Translate biography to EN
- [ ] Translate all 3 case studies to EN, reviewed line by line (watch technical term mapping, §10.5)
- [ ] Translate UI strings in `/messages/en.json`
- [ ] Verify hreflang tags resolve correctly both directions
- [ ] Full locale QA pass: switch FR↔EN on every page, check for leftover FR/EN strings

## M4 — Test & Harden (Days 16–20)
**Exit:** all performance/accessibility budgets met, zero typos.

- [ ] Test full site on a real mid-range Android device over throttled 4G
- [ ] Run Lighthouse mobile: confirm ≥95 on Performance, Accessibility, Best Practices, SEO
- [ ] Verify LCP < 2.0s, CLS < 0.05, INP < 200ms, initial JS < 150KB gzipped (homepage)
- [ ] Keyboard-only navigation pass across all pages
- [ ] Screen reader pass (landmarks, alt text both locales, chart data-table fallback)
- [ ] Verify contrast ratios, esp. `--steel` on `--paper`
- [ ] Contact form end-to-end test (submit, honeypot, rate limit, email delivery via Resend)
- [ ] Full link audit (nav, footer, case study links, CV download)
- [ ] Proofread FR content by a francophone third party
- [ ] Fix all issues found before proceeding

## M5 — Launch (Day 21)
**Exit:** site public and distributed.

- [ ] Point custom domain to Vercel, confirm SSL
- [ ] Submit sitemap to Google Search Console
- [ ] Add portfolio URL to CV header (FR + EN)
- [ ] Add portfolio URL to LinkedIn profile
- [ ] Add portfolio URL to email signature
- [ ] Publish LinkedIn launch post

## M6 — Enrich (Weeks 4–7) — V1.1–1.3
**Exit:** V1.3 complete; each demo revealed only when finished and mobile-tested.

- [ ] Write case study 4 (from planned slots, e.g. `gestion-consommables` or `nexteer-optimisation-outils-cnc`)
- [ ] Write case study 5
- [ ] Build consommables demo (V1.2): rebuild from scratch, own code, synthetic data, seeded in-memory state, reset button, honesty banner (§7.1)
- [ ] Mobile-test consommables demo, ship behind feature flag, reveal only when complete
- [ ] Build synthetic dataset for scrap dashboard — plausible 80/20 Pareto, realistic scrap rates, visible DMAIC-matching inflection (§10.10)
- [ ] Build dashboard demo (V1.3): Pareto chart, scrap trend, shift/station breakdown, one filter, Recharts (§7.2)
- [ ] Mobile-test dashboard demo, ship behind feature flag, reveal only when complete
- [ ] Generate per-case-study OG images
- [ ] Prepare LinkedIn featured-section assets

## M7 — Iterate (Ongoing) — V2+
**Exit:** metrics in §12 trending to target.

- [ ] Set up bi-weekly metrics review cadence (first 2 months)
- [ ] Run chronométrage / équilibrage self-directed study, write as short case study (§10, known gap)
- [ ] Evaluate 3D CAD viewer against performance budget; build only if it meets it, else ship static render (§7.3)
- [ ] Build dark mode (V2, low priority)
- [ ] Add remaining case studies from the planned slots table (§6)
- [ ] Add print stylesheet for case studies
- [ ] Pursue certification (Green/Yellow Belt, CATIA, or Power BI) as a parallel career action (§10.7)
