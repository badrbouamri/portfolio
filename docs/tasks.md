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

- [ ] **Verify the Stellantis confidentiality clause (convention de stage) before publishing** — restored as a hard blocker on the Stellantis case study specifically; see `⚠️ NE PAS PUBLIER` note at the top of that file (PRD §10.3)
- [ ] Retrieve PFE report (drafts / encadrant / ENSET library) — needed to fill the placeholders left in the Stellantis case study below
- [x] Write professional biography, FR, 174 words — `content/fr/biographie.md` (draft, needs your review for voice)
- [~] Write case study: `stellantis-maitrise-cout-transformation` (methodes, featured) — `content/fr/projets/stellantis-maitrise-cout-transformation.mdx`. Skeleton drafted from CV facts only; **Analyse d'ingénieur, cause-racine detail, Difficultés, Résultats (étanchéité), Enseignements are placeholders** — real content needs the PFE report, and publication is blocked on the confidentiality check above
- [~] Write case study: `aic-diagnostic-pliage-cintrage` (maintenance, not featured — homepage's 3 featured slots are Stellantis + a conception project + a digital project per PRD §4.4) — `content/fr/projets/aic-diagnostic-pliage-cintrage.mdx`. Skeleton from CV facts; **Analyse d'ingénieur, Difficultés, failure-mode detail are placeholders**; Résultats block is an honest interim statement (plan handed off to site maintenance team), not a placeholder
- [~] Write 3rd case study: `irrigation-intelligente-iot` (digital, featured) — `content/fr/projets/irrigation-intelligente-iot.mdx`. Skeleton from CV facts; **exact dates unknown (period/durationLabel explicitly marked "À préciser" — do not guess a date**); Analyse d'ingénieur partially filled with legitimate generic IoT engineering reasoning (MQTT vs polling, local vs remote decision), flagged as needing project-specific specifics on top
- [x] Apply confidentiality rules to each: anonymised, standard indexation notice added to Stellantis and AIC (irrigation project is personal, not confidential)
- [ ] Redraw figures per case study (Pareto, Ishikawa/AMDEC extract, layout, calculation) — no screenshots of internal docs — blocked on real data from PFE report / your own diagrams
- [ ] Take/select professional photograph (current, neutral background)
- [ ] Assemble CV PDF, FR — filename `CV_ELBOUAMRI_BadrEddine_FR.pdf`, portfolio URL in header
- [ ] Assemble CV PDF, EN — `..._EN.pdf`

## M2 — Scaffold & Build (Days 8–16, overlaps M1)
**Exit:** all V1 pages rendering with real FR content.

- [x] Scaffold Next.js 15 App Router + TypeScript strict
- [x] Set up Tailwind v4 with design tokens from §8.2 in `@theme`
- [x] Self-host fonts (IBM Plex Sans / Sans Condensed / Mono) via `next/font/local`
- [x] Set up next-intl, locale-prefixed routing (`/fr` default, `/en`)
- [x] Build layout shell: Header, Footer, LocaleSwitcher, CvButton
- [x] Define Zod content schema (§6 frontmatter) in `/lib/schema.ts`
- [x] Build MDX pipeline (`/content/fr/projets/*.mdx`), validate at build time — `/en/projets/*.mdx` doesn't exist yet, pipeline tolerates its absence (real EN case studies are M3)
- [x] Seed one case study through the pipeline end-to-end — all 3 render
- [x] Build case study template + **Cartouche** component (§8.6)
- [x] Build remaining case-block components: KpiRow, FigureBlock, MethodSteps, ToolChips, ConfidentialNotice
- [x] Build Projets index: card grid + client-side filtering by category, URL-synced (`?categorie=`) — server-rendered per request, no flash of unfiltered content
- [x] Build Homepage: Hero, ProofBar (3 facts), FeaturedProjects, CompetenceBlocks, MiniTimeline, Contact block (§4.4) — FeaturedProjects renders 2 real cards, not 3 (no `conception`-category case study exists yet — known gap, see M6/M7)
- [x] Build Parcours page: bio, photo placeholder (no real photo yet — flagged inline), experience timeline, education, certifications (honest empty state), languages, availability (§5.2)
- [x] Build Compétences page: 6 groups with one evidence line each, linked to case studies where real evidence exists — Conception & Simulation and Sciences de l'ingénieur groups are honestly unlinked (§5.3)
- [x] Build Contact page: form (nom/email/organisation/message) + honeypot + rate limit + Zod validation + Resend Server Action, plus plain-text email/phone/location (§5.8) — LinkedIn shown as text only, no URL (none verified yet); `RESEND_API_KEY` not configured, so sending degrades gracefully to a logged error + user-facing message until the key is added in Vercel
- [ ] Build `/mentions-legales` page (§5.9) — not yet built, still open
- [x] Wire CV download action: `/fr/cv` (and `/en/cv`, serving the FR PDF until an EN version exists) redirects to the PDF — analytics event is currently a stub call, not yet wired to a real provider
- [ ] Add SEO: per-locale metadata, hreflang alternates, `sitemap.ts`, JSON-LD Person schema — not started
- [ ] Add OG images (`opengraph-image.tsx`) — not started
- [ ] Add Vercel Web Analytics + Speed Insights, wire events: `cv_download`, `case_study_read`, `demo_opened`, `contact_submitted`, `locale_switched` — not started, stub call points exist (CvButton, LocaleSwitcher) for future wiring
- [x] Load real FR content (bio + 3 case studies from M1) into the site

**M2 is not fully closed** — `/mentions-legales`, SEO, OG images, and analytics wiring (PRD §9.5 step 9) are still open. Everything else (steps 1–8) is built, merged to `main`, and passes `npm run build`/`npm run lint`/a live smoke test across every route in both locales.

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
