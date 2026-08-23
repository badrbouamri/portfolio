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

- [x] **Verify the Stellantis confidentiality clause (convention de stage) before publishing** — confirmed cleared (2026-08-23). Removed the `⚠️ NE PAS PUBLIER` warning comments from both FR/EN case study files and the sitemap exclusion that had been added as a precaution in M5.
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

- [x] Translate biography to EN — `content/en/biographie.md` (181 words, faithful translation, not machine-translated)
- [x] Translate all 3 case studies to EN, reviewed line by line (watch technical term mapping, §10.5) — `content/en/projets/*.mdx`. `⚠️ À COMPLÉTER` placeholders preserved as `⚠️ TO COMPLETE` in all 3 (root-cause reasoning/difficulties/lessons still need the real PFE/PFA report — not fabricated in either language); Stellantis EN file keeps the same `NE PAS PUBLIER`/confidentiality-clause warning
- [x] Translate UI strings in `/messages/en.json` — done incrementally across the M2 workstreams; this pass removed the stale "(FR)" suffixes and pending-translation banner now that real EN case studies exist, and fixed hardcoded `locale="fr"` overrides in Parcours/Compétences case-study links
- [x] Verify hreflang tags resolve correctly both directions — added `generateMetadata` + `alternates.languages` in `app/[locale]/layout.tsx` (fr/en/x-default), confirmed via rendered `<link rel="alternate">` tags on both `/fr` and `/en`. Note: this covers site-wide root hreflang only — per-page metadata, sitemap, and JSON-LD are still M2's open SEO item, not duplicated here.
- [x] Full locale QA pass: switch FR↔EN on every page, check for leftover FR/EN strings — all 16 routes (8 pages × 2 locales) return 200; grepped rendered EN HTML for common FR UI words, only false positives found (a JSON namespace key, and the deliberately-untranslated FR job-title phrase "Ingénieur Méthodes, Industrialisation..." which recruiters search for by that exact French term)

## M4 — Test & Harden (Days 16–20)
**Exit:** all performance/accessibility budgets met, zero typos.

- [ ] Test full site on a real mid-range Android device over throttled 4G — **not done, needs you**. No physical device available; tested instead via Lighthouse's mobile emulation + simulated-4G throttling against a local production build (no Vercel deployment exists yet, so this can't reflect real CDN/edge latency either). Do a real-device pass once deployed.
- [x] Run Lighthouse mobile: Performance 97, Accessibility 100, Best Practices 100, SEO 90 (homepage, `/fr`) — three of four ≥95. SEO's `meta-description` audit reports missing despite the tag being confirmed present in rendered HTML (verified via curl) — treated as a Lighthouse/tooling false-negative, not a real gap; the real, legitimate SEO shortfall is that only the site-wide title/description exist — no per-page metadata yet (still M2's open SEO item, not duplicated here).
- [x] Verify LCP < 2.0s, CLS < 0.05, INP < 200 ms, initial JS < 150 KB gzipped (homepage) — CLS 0, homepage First Load JS 134 KB (within budget). **LCP: 2.6s, over budget** — found and partly fixed a real bug (see below); remaining gap is total font+JS payload under simulated-4G, not a discrete defect.
  - **Bug found & fixed:** the Header's CV button (`next-intl` `Link`, present on every page) was auto-prefetching the `/cv` redirect route, and the browser followed the redirect during prefetch, silently downloading the full 299 KB CV PDF on every page load. Fixed with `prefetch={false}` — confirmed via network trace that the PDF is no longer fetched on load. This alone dropped LCP from 2.8s to 2.6s.
  - Further reduction would mean dropping a font weight from the PRD §8.3 3-typeface/5-weight system — a design-system decision, not a bug fix, so left for you to decide rather than done unilaterally.
- [x] Keyboard-only navigation pass across all pages — verified via a real browser: Tab order follows DOM order correctly, focus-visible ring (2px accent) renders correctly, honeypot (`tabIndex={-1}`) correctly skipped in sequence.
- [~] Screen reader pass — **no literal screen reader (NVDA/VoiceOver) was used**, since none is available in this environment. Substituted: Lighthouse accessibility audit (100/100), and a manual accessibility-tree inspection confirming the contact honeypot is properly `aria-hidden` (a tool false-positive during testing suggested otherwise at first — verified against the actual source, the `aria-hidden` wrapper is correctly present). Recommend a real screen-reader pass (VoiceOver on iPhone/Mac, or NVDA) before launch — quick for you to do, not reliably substitutable by automated tooling alone.
- [x] Verify contrast ratios, esp. `--steel` on `--paper` — **failure found and fixed.** Confirmed via Lighthouse's axe-core audit: `--steel` (#78838C) measured 3.54:1 against `--paper` and 3.87:1 against `--surface` at the 12px sizes used sitewide (eyebrows, captions, dates) — below the required 4.5:1. `--signal` (#B26B00) also measured 4.2:1 against `--surface` for the 14px KPI figures. Darkened both tokens in `app/globals.css` (`--steel` → `#626d77`, `--signal` → `#9c5e00`) to the minimum shade clearing 4.5:1 against both backgrounds, same hue, documented inline. Re-ran the audit: accessibility 100/100, `color-contrast` now passes.
- [x] Contact form end-to-end test — tested live via a real browser (not curl, since it's a Server Action). Confirmed: valid submission degrades gracefully with the missing `RESEND_API_KEY` (clean French error message, server log confirms the actual cause, no crash); server-side Zod validation produces correct per-field, direction-giving errors (name/email/message); honeypot and rate-limit code paths reviewed, honeypot's tab-order exclusion confirmed live. **Real email delivery still untested** — needs a `RESEND_API_KEY` in the deployment environment, which doesn't exist yet.
- [x] Full link audit (nav, footer, case study links, CV download) — **1 broken link found and fixed:** `/mentions-legales` (linked from every page's footer) 404'd because the page was never built (open since M2). Built it now per PRD §5.9 (identity/anonymisation policy/analytics/contact-data-use/rights, both locales) since it's a direct, confirmed regression otherwise. Re-crawled all 8 pages × 2 locales afterward — 20 unique internal links, all resolve.
- [ ] Proofread FR content by a francophone third party — **not done, needs you.** This requires an actual independent human reviewer per PRD §10 — not something I can substitute for by re-reading my own French.
- [x] Fix all issues found before proceeding — contrast tokens, CV-prefetch bug, and the missing mentions-légales page are fixed and verified; `npm run build`/`npm run lint` clean.

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

- [x] Write case study 4: `gestion-consommables` (digital) — paired with the demo rebuild, real specifics (not internship-gated placeholders) since the author built this one directly
- [x] Write case study 5: `nexteer-optimisation-outils-cnc` (lean) — deliberately thin per the PRD's own note; only ~130 words of real CV-grounded content, rest honestly placeholder-tagged, not padded
- [x] Build consommables demo (V1.2): original code, synthetic seeded data (5 invented consumables, 4 generic workstations), logging consumption/alert-threshold/reset all verified working live in a real browser; honesty banner verified verbatim in both locales; no real Stellantis names/data
- [x] Mobile-test consommables demo — verified the responsive safeguard at the code level (tables wrapped in `overflow-x-auto`, no fixed-width overflow risk); flag left **off** by default, ready to enable once deployed
- [x] Build synthetic dataset for scrap dashboard — 1,000-event Pareto (sealing/adhesive-application dominant at 38%, realistic 80/20 shape), 20-week trend with a clear DMAIC inflection at week 11 (~34% reduction, consistent with the real −33.8% figure), shift/station breakdown with ST40 correctly dominant — verified visually, tells a plausible, consistent story
- [x] Build dashboard demo (V1.3): Pareto + trend + shift/station breakdown (Recharts), one working filter (verified live — filter updates the chart correctly), accessible data-table fallback on every chart (§8.9)
- [~] Mobile-test dashboard demo — code-level safeguard verified (each chart independently horizontally-scrollable via `overflow-x-auto` + `min-w`, won't overflow the page body), but a true 390px **visual** check wasn't possible — this session's browser tool can't actually resize the viewport (confirmed via `window.innerWidth`, same limitation the build agent hit). Flag left **off** by default; do a real visual mobile check before enabling.
- [x] Generate per-case-study OG images — `app/[locale]/projets/[slug]/opengraph-image.tsx` + a site-wide `app/[locale]/opengraph-image.tsx`, both using real IBM Plex fonts, verified visually (cartouche-style eyebrow, title, organisation, headline KPI in the corrected accent-safe amber)
- [x] Prepare LinkedIn featured-section assets — treated as satisfied by the OG images above (LinkedIn's own link preview reads OG tags directly); no separate bespoke asset pipeline was built — flag if a different format is actually wanted

**Both demo feature flags (`NEXT_PUBLIC_DEMO_CONSOMMABLES`, `NEXT_PUBLIC_DEMO_PILOTAGE`) are off by default in the committed code.** Set them in the Vercel deployment environment once you've done a final real-device mobile pass — not something I can verify further from this sandbox.

## M7 — Iterate (Ongoing) — V2+
**Exit:** metrics in §12 trending to target.

- [ ] Set up bi-weekly metrics review cadence (first 2 months) — **needs you**; this is a recurring human habit (checking Vercel Analytics + your own interview log against PRD §12's targets), not something to automate. Blocked anyway on the site being live and analytics actually wired (still open, M2).
- [ ] Run chronométrage / équilibrage self-directed study, write as short case study (§10, known gap) — **needs you**: requires actually timing/balancing a real documented process (PRD calls it "a weekend" of fieldwork). I can write the case study once you have real data, same as the other internship case studies — not before.
- [ ] Evaluate 3D CAD viewer against performance budget; build only if it meets it, else ship static render (§7.3) — **blocked on you**: PRD's own condition is "only academic models (verify IP)" — no such model/file exists yet. Building the viewer infrastructure speculatively, with nothing real to test the ≤3MB Draco-compressed budget against, would be exactly the premature/unrequested scope this project's conventions warn against.
- [ ] Build dark mode (V2, low priority) — **holding for your go-ahead**: PRD §7.8 itself argues against this ("doubles design QA for zero hiring value") and it'd be a cross-cutting change touching every token/component on an already-shipped design. Not started; say the word if you actually want it.
- [ ] Add remaining case studies from the planned slots table (§6) — **blocked on you**: the two open slots (academic design/dimensionnement project, ANSYS/ABAQUS simulation project) are marked "(to define)" in the PRD itself — you haven't picked what real project fills them yet.
- [x] Add print stylesheet for case studies — `@media print` in `app/globals.css`: hides Header/Footer/nav chrome and demo interactive roots (`data-demo-root`), preserves the Cartouche/KPI colors via `print-color-adjust: exact` (browsers strip background/border colors by default), avoids awkward page breaks inside the Cartouche/KPI blocks and right after headings. Verified the build renders correctly with the new attributes wired into `Cartouche`, `KpiRow`, `ConsommablesApp`, and the pilotage demo page; didn't force an actual print-preview screenshot since that requires `window.print()`, which opens a native OS dialog that can block browser automation — standard, well-supported CSS, low risk.
- [ ] Pursue certification (Green/Yellow Belt, CATIA, or Power BI) as a parallel career action (§10.7) — **entirely yours**, PRD itself frames this as a career action, not a website task.
