---
name: Badr Eddine ELBOUAMRI — Portfolio
description: A sober, bilingual industrial-engineering portfolio styled after mechanical technical documentation.
colors:
  paper: "#f4f5f6"
  surface: "#ffffff"
  ink: "#14181b"
  graphite: "#3a4249"
  steel: "#626d77"
  rule: "#dce0e3"
  accent: "#0b5563"
  signal: "#9c5e00"
typography:
  display:
    fontFamily: "IBM Plex Sans Condensed, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(25px, 4vw, 49px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  data:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  none: "0px"
  hairline: "2px"
spacing:
  "1": "8px"
  "2": "16px"
  "3": "24px"
  "4": "32px"
  "6": "48px"
  "8": "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.hairline}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "8px 16px"
  button-secondary-hover:
    textColor: "{colors.accent}"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.hairline}"
    typography: "{typography.data}"
    padding: "2px 8px"
  card-project:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px"
---

# Design System: Badr Eddine ELBOUAMRI — Portfolio

## Overview

**Creative North Star: "The Cartouche" — a mechanical engineering technical drawing's title block, rendered as a whole website.**

This is not a personal-brand site borrowing engineering motifs for flavor; it is styled as if the site itself were a piece of technical documentation — a drawing sheet, a routing card, a process standard. Every recurring device (the bordered field grid of the Cartouche, monospaced numeric data, hairline rules as the primary separator, small-caps mono eyebrows) is drawn from the actual vernacular of mechanical engineering paperwork, not from a generic "clean minimal" aesthetic. Precision *is* the aesthetic: near-square corners, no shadows beyond a functional 1px hairline, no gradients. Motion (see Motion, below) is drawn from the same vernacular — a plotter drawing a line, a stamp landing on a field — so it earns its place as identity, not decoration.

The palette reads as industrial instrumentation — petrol accent, graphite ink, amber for data emphasis only — deliberately avoiding both the generic "engineering blue" of enterprise software and the warm cream/terracotta or near-black/acid palettes that now read as AI-generated template defaults. The typographic system is one superfamily (IBM Plex) used in three registers — condensed display for structure, regular sans for prose, mono for every number — which is what makes the numeric data (KPIs, dates, tool tags) visually legible as *data* rather than incidental text.

Confirmed visual anti-references (PRD §3.5, §8.1): student project, agency template, AI-generated startup landing page, over-designed showreel, tech-startup gradient/glassmorphism convention, Stellantis' own brand blue (borrowing a target employer's color reads as naive), the generic `#0066CC` "engineering blue."

**Key Characteristics:**
- Flat, bordered surfaces — hairline rules do the separating work cards-with-shadows would do elsewhere.
- Near-square corners (2px max radius) everywhere; nothing rounds enough to feel soft.
- Amber (`--signal`) is rationed to data emphasis only — KPI figures, chart highlights, active filters — never decoration.
- All numeric content is monospaced, unconditionally, sitewide.
- One signature structural device (the Cartouche) carries the site's entire visual personality; everything else stays quiet by comparison.
- Motion is now a full, authored layer, not a single reveal — every page opens with one focal "plotter" sequence, and every scroll reveal, hover, and state change carries the same drafting-instrument character (see Motion, below). Still never scroll-jacking, never parallax-for-spectacle, never bounce/elastic easing — the site should feel precise in motion, not lively.

## Colors

A four-neutral, two-accent system — restrained on purpose; a wider palette would read as decorative rather than instrumental.

### Primary
- **Petrol** (`#0b5563`, token `accent`): links, primary buttons, active nav states, focus rings. The site's one "brand" color — deep, desaturated teal rather than a bright engineering blue.

### Secondary
- **Industrial Amber** (`#9c5e00`, token `signal`): reserved exclusively for data emphasis — KPI headline figures on project cards, chart highlights, blockquote rule. **The Amber Rationing Rule.** If amber appears more than twice in a single viewport, remove one instance; it is a data-emphasis color, never a decorative one. (Darkened from the PRD's original `#b26b00` after an axe-core audit found the original failed 4.5:1 contrast at the 14px KPI-figure size; same hue preserved.)

### Neutral
- **Cool Paper** (`#f4f5f6`, token `paper`): page background. Deliberately cool-neutral, not cream — reads as drafting paper, not warm/consumer.
- **Surface White** (`#ffffff`, token `surface`): cards, the Cartouche, form fields — anything that sits one layer above the page.
- **Ink** (`#14181b`, token `ink`): primary text, headings, primary-button hover fill.
- **Graphite** (`#3a4249`, token `graphite`): secondary/body-adjacent text (card summaries, tag labels).
- **Steel** (`#626d77`, token `steel`): tertiary text — captions, eyebrows, metadata, dates. (Darkened from the PRD's original `#78838c` after the same audit found it failed 4.5:1 at the 12px sizes used sitewide for eyebrows/captions; same hue preserved.)
- **Rule** (`#dce0e3`, token `rule`): hairline borders and dividers — the system's primary separator, standing in for the shadows a card-based UI would otherwise use.

### Named Rules
**The Hairline Rule.** Separation between regions is drawn with a 1px `--rule` border, never a `box-shadow`. The one sanctioned exception is the project card's hover state, which uses a flat 4px offset step-shadow (`0 4px 0 0 var(--color-rule)`) — a drafting-ruler nudge, not ambient elevation.

### Dark mode (2026-09-02)
Same 8 tokens, same roles — paper/surface darken, ink/graphite/steel lighten, `accent`/`signal` brighten (not just invert) so they still clear 4.5:1 as text against the new dark backgrounds. Values live in `app/globals.css` under a `:root[data-theme="dark"]` block (explicit choice, `ThemeToggle.tsx`) and a matching `@media (prefers-color-scheme: dark)` block (OS default, no JS). Components that use `--ink`/`--paper` as a swappable text/background pair (not a literal color) invert correctly for free — e.g. HomeSkillsGrid's dark cards become light cards on the dark page, which still reads as a valid "accent card" treatment. The one component that can't safely invert is `OrgLogo`: partner-brand raster logos are drawn for a white background, so its card keeps a **fixed** light plate regardless of theme (literal `#ffffff`/`#dce0e3`/`#626d77`, not tokens) — the only place in the system where a color is deliberately theme-inert.

## Typography

**Display Font:** IBM Plex Sans Condensed, 600 (with ui-sans-serif, system-ui, sans-serif fallback)
**Body Font:** IBM Plex Sans, 400/500 (with the same fallback stack)
**Data/Mono Font:** IBM Plex Mono, 400/500 (with ui-monospace, monospace fallback)

**Character:** One superfamily used in three deliberately distinct voices — condensed-and-weighted for structure, regular for reading, monospaced for anything measured or counted. All three are self-hosted via `next/font/local` (no Google Fonts request), which is both a performance decision (better LCP, reliable in Morocco) and a coherence one: three faces from one family read as a system, not a mismash.

### Hierarchy
Scale ratio 1.250: 12 / 14 / 16 / 20 / 25 / 31 / 39 / 49px.

- **Display** (600, 25–49px per breakpoint, line-height 1.2): h1–h3, section labels. Condensed width gives industrial-signage character without reaching for a novelty face.
- **Body** (400, 16px mobile / 17px desktop, line-height 1.6, measure capped at 68ch): all prose and UI copy.
- **Data** (400/500, sizes inherited from context, line-height 1.4): every KPI, date, tool tag, figure caption, and Cartouche field value — unconditionally, sitewide.
- **Emphasis-in-prose:** `<strong>` renders at weight 500 (not a synthesized bold — the body face has no 700 file); `<em>` renders as upright `--steel`-colored text (IBM Plex Sans ships no italic, so this reads as a quieter aside instead of a faux-slant).

### Named Rules
**The All-Numbers-Are-Mono Rule.** Every number on the site — KPI values, dates, percentages, tool-tag text — sets in `--font-data`, no exceptions. `−33,8 %` in mono next to prose in sans is the typographic tell that this is an engineer's site, not a marketer's. French number formatting applies in FR (comma decimal, non-breaking space before `%`).

## Layout

12-column grid, 1200px max width, 24px gutters (16px on mobile). 8px spacing base (scale: 8 / 16 / 24 / 32 / 48 / 64px). Mobile-first; breakpoints at 390 / 768 / 1024 / 1280px. Every page must render meaningfully within the first viewport at 390px — persona 2 (HR screening) is on a phone with 20–60 seconds.

Structural numbering (`01 / 02 / 03`) is permitted only where sequence carries real information — DMAIC phases, 8D steps, process routing steps, the roadmap. It is never used as decoration on non-sequential sections (skills, contact). Section eyebrows use small-caps mono labels in the pattern `ÉTUDE DE CAS 02 · MÉTHODES`.

## Elevation & Depth

Flat by design — this system does not use ambient shadows or tonal layering for depth. Hierarchy between regions is conveyed entirely through the hairline-rule border system (see Colors → Named Rules) and background contrast between `--paper` and `--surface`. The one shadow in the system is functional, not atmospheric: a project card's hover state offsets by a flat, hard-edged 4px step in `--rule`, read as a drafting-tool nudge rather than a light source.

### Named Rules
**The Flat-By-Default Rule.** No `box-shadow` softens or blurs. Where a shadow exists at all, it is a hard-edged flat offset used as a state cue, never as ambient depth.

## Motion

Revised 2026-08-29: the original brief kept motion to a single on-load reveal per view. That constraint is now lifted — the site earns a full, authored motion layer — but the character stays exactly as disciplined: every gesture is drawn from the same drafting-table vernacular as the rest of the system, never a generic software-product effect borrowed for liveliness.

**The focal sequence.** Every page gets exactly one authored entrance: its own grid or hairline structure resolves first, then its content stamps in over it, field by field — the same pattern the Cartouche already uses. The homepage hero is the site's most authored moment: the graph-paper grid backdrop draws itself in as a ruled sweep, then the portrait, name, and positioning line stamp in on top of it in sequence.

**Supporting motion.** Scroll-triggered section entrances keep their existing per-item stagger, but eyebrows and headings now reveal via a left-to-right clip-path sweep (the same ruler-tick gesture the nav underline already uses) instead of a plain fade. KPI figures and stat numbers read as a measurement being taken — a brief tick/count to the final value — rather than appearing pre-formed. Buttons and links carry the gesture into their hover/focus state: a fill or underline sweeps in from its origin edge instead of swapping instantly.

**Timing.** 150–300ms for state/feedback, 300–500ms for layout/section reveals, up to 700ms for a page's one focal entrance. Natural deceleration (`cubic-bezier(0.16, 1, 0.3, 1)`) throughout — never bounce or elastic. Exits are always faster than entrances.

**Still off-limits.** Scroll-jacking, parallax layers, particle or decorative effects, bounce/elastic easing, and any gesture that can't be named as one of: a line being ruled, a field being stamped, or a measurement being read. `prefers-reduced-motion: reduce` still zeroes every duration sitewide — the site must be fully legible and complete with motion off.

### Named Rules
**The Plotter Rule.** Every authored sequence traces one of exactly three drafting actions — ruling a line, stamping a field, taking a measurement. If a proposed animation isn't one of those three, it doesn't belong on this site, no matter how restrained it looks in isolation.

## Shapes

Near-square corners throughout — 2px border-radius is the system maximum (`--radius-hairline`), applied to buttons, tags, and inline code; most surfaces (cards, the Cartouche) use 0px radius outright. Borders are always 1px solid `--rule` except where a component's own accent color takes over on hover/focus (buttons, cards, nav links). No clipping, no decorative masking, no organic or asymmetric silhouettes anywhere in the system — every shape reads as drafted, not sculpted.

## Components

### Buttons
- **Shape:** 2px radius (`--radius-hairline`), 1px border on the secondary variant only.
- **Primary:** `--accent` background, `--surface` text, 8px/16px padding, hover fills to `--ink`.
- **Secondary/Ghost:** transparent background, `--rule` border, `--ink` text; hover swaps both border and text to `--accent`.
- **Focus:** 2px `--accent` outline, 2px offset, on every interactive element sitewide — not just buttons.

### Chips (Tag / ToolChips)
- **Style:** transparent background, 1px `--rule` border, 2px radius, `--graphite` text, set in `--font-data` at 12px.
- **State:** static display only in the current implementation (category badges, tool tags) — no selected/unselected toggle state exists yet outside the Projets category filter, which is a separate control, not a chip variant.

### Engineering Projects rows (ProjectRow) — one-off exception
**2026-09-01 reversal.** The bordered `ProjectCard` grid tile (below, kept for reference) was replaced on the homepage and `/projets` by `ProjectRow`, an editorial image+text row: photo on one side (alternating), title/subtitle/summary on the other. This is a **deliberate, explicit exception** to the token system, not a system update — the user asked twice, after being shown the conflict (this reference site's dark/serif/red look was already evaluated and rejected once before, see `docs/tasks.md` M7 §"Homepage redesign... scoped down after flagging the conflict"), to clone it anyway for this one section. It introduces two literal values outside the palette/type scale, both recorded as explicit `ignore-value` entries in `.impeccable/config.json` rather than added to the token system:
- `.font-editorial` — `Georgia, "Times New Roman", serif`, used only for the row/section title and subtitle.
- `.text-editorial-accent` — `#b5342c` (red), used only for the row subtitle.
- The `/projets` page header (`ProjectsHeroBand`) originally reused `.hero-grid-bg`'s grid-line motif inverted on a dark ground rather than sourcing a stock photo; **2026-09-01 (same day)**, the user supplied their own stock image (`public/images/projets-hero-gears.webp` — a gears/circuit "technology network" graphic) and asked for it as the band's background instead, so `.projects-hero-dark` was removed and the band now renders that image via `next/image`. Licensing for that image is the user's responsibility, not verified here.

Do not extend `.font-editorial` / `.text-editorial-accent` to any other component — treat this as scoped to Engineering Projects rows only, not a precedent for future reference-site cloning.

### "Ce que je sais faire" skills cards (HomeSkillsGrid) — layout-only borrow
**2026-09-02.** Unlike the Engineering Projects rows above, this restyle kept the token system: dark cards use `bg-ink`/`border-graphite` (→ `border-steel` on hover/focus) — existing tokens, just used as a card surface for the first time — `--paper`/`--rule` for on-dark text, and the sitewide `--radius-hairline` (2px), not a new rounded-card radius, even though the reference layout had rounder corners (explicit user call when asked). The one fully-round element, the small circular arrow control, reuses `rounded-pill` (999px) — the existing `SkillsToolbox` exception, not a new one. Only the *layout* (3-column grid with a center portrait on desktop, 01–04 corner numbering, circular arrow) is borrowed from a reference screenshot. The portrait (`public/images/profile-cutout.png`) is a user-supplied transparent PNG; a subtle `--color-accent` radial glow sits behind it (`.skills-photo-halo`, no new color).

### Cards (ProjectCard) — superseded, kept for history
- **Corner Style:** 0px radius.
- **Background:** `--surface` on `--paper`.
- **Border:** 1px `--rule` at rest, swaps to `--accent` on hover/focus.
- **Shadow Strategy:** none at rest; on hover, a flat 4px `--rule` step-shadow plus a 2px upward translate (see Elevation).
- **Internal Padding:** 16px (`--spacing-2`).
- **Content pattern:** category tag → title (display face, `--text-md`) → mono metadata line (organisation · period) → summary (`--graphite`, 3-line clamp) → headline KPI in `--signal` mono → tool chips → mono CTA in `--accent` with a directional arrow that nudges 3px on hover.
- No longer rendered anywhere as of 2026-09-01 (component file deleted); described here only so the Elevation/card-hover-step references elsewhere in this doc still resolve to something.

### Navigation
- **Style:** mono, uppercase-tracked labels; underline is a ruler-tick sweep (`scaleX` from 0 to 1, accent-colored, 200ms ease-out) on hover/focus rather than a static or fading underline — the template gesture for every other sweep-fill on the site (buttons, headings) per the Motion → Plotter Rule.
- **Mobile:** header collapses to logo + CV action + hamburger; the CV action never hides inside the hamburger menu (a hard product requirement, not a style choice). The mobile panel plays a single on-mount stagger reveal, no exit animation.

### The Cartouche (signature component)
The site's one memorable, load-bearing visual device: a bordered grid of labelled fields (`PROJET · ORGANISATION · PÉRIODE · RÔLE · MÉTHODES · INDICE DE CONFIDENTIALITÉ`) opening every case study, styled after a technical drawing's title block. Single column on mobile, 3-column at `sm`, full 6-column at `lg`; fields separate with hairline rules (top-border on mobile, left-border at `sm+`). Each field's label sets in uppercase mono `--steel` at 12px, its value in mono `--ink` at 14px. On load, fields stamp in left-to-right/top-to-bottom via a shared 350ms reveal keyframe with per-field stagger delays (0/50/100/150/200/250ms) — the one place on the site where sequential reveal timing itself carries meaning, echoing how the fields are meant to be read.

**The One-Signature Rule.** The Cartouche's bordered field-grid *layout* is exclusive to case studies — no other section may reuse that composition. Its stamp-in *motion* is not exclusive: per Motion → The Plotter Rule, every page's focal sequence now follows the same "structure resolves, then content stamps in" pattern the Cartouche pioneered. Sharing the gesture doesn't dilute the layout; it's the layout that stays reserved.

## Do's and Don'ts

### Do:
- **Do** set every number, date, and tag in `--font-data` (IBM Plex Mono) — no exceptions, sitewide.
- **Do** use hairline (`1px --rule`) borders as the default separator between regions instead of shadows or card elevation.
- **Do** keep border-radius at 2px or 0px — nothing rounder exists in this system.
- **Do** ration `--signal` (amber) strictly to data emphasis: KPI figures, chart highlights, active filter state.
- **Do** use structural numbering (`01/02/03`) only where the underlying content is genuinely sequential (DMAIC, 8D, process steps).
- **Do** respect `prefers-reduced-motion: reduce`, which zeroes out every animation/transition duration sitewide.
- **Do** name every new animation as one of the Motion → Plotter Rule's three actions (rule a line / stamp a field / take a measurement) before building it.

### Don't:
- **Don't** add gradients, glassmorphism, drop shadows beyond the one functional step-shadow, or particle/decorative effects — PRD §8.1 forbids all of them explicitly.
- **Don't** introduce a second bordered-field-grid *layout* outside the Cartouche (see The One-Signature Rule) — its motion pattern is shared sitewide, its layout is not.
- **Don't** add scroll-jacking, parallax-for-spectacle, or bounce/elastic easing — the Motion section lifted the "one reveal" limit, not the restraint on gimmicks.
- **Don't** use amber, or any color, as pure decoration — every color in this system carries a semantic role.
- **Don't** render skill/competency levels as percentage bars — PRD explicitly calls these "unfalsifiable and juvenile"; use evidence links instead.
- **Don't** introduce a second accent hue or a warmer/cooler neutral ramp without updating this file first — the four-neutral/two-accent palette is a deliberate constraint, not an incomplete one.

---

## Redesign — complete and merged (2026-09-02) — `BRIEF-REFONTE-PORTFOLIO.md`

**Status: complete.** All 8 phases (0–8) landed and were merged to `main` via PR #1 (merge commit `4924f85`), followed by a real Lighthouse pass that found and fixed three issues (`0ff277c`) and a pre-existing repo-integrity fix required for Vercel's build to succeed (`6b00098`, unrelated to the redesign itself — see below). This section originally recorded the Phase 0 audit before any code was touched; it's kept as the historical record of the conflicts found against the pre-redesign system and how each was resolved with the owner. "Phase 7 — Motion pass" and "Phase 8 — Quality pass and delivery" below continue the same record through to completion. `CLAUDE.md`'s top-of-file note has the merge commit and a pointer to what changed component-by-component.

### What the brief asks for, and the scope decision made

The brief (a "Simon Sparks"-style Dribbble reference — deep blue night, editorial serif, brass accent, offset frames — reinterpreted for an industrial-methods engineer's audience, not a 3D artist's) was written as a **dark-only** redesign: one palette, no light mode. That directly conflicted with dark mode + light-as-default, which shipped the day before this brief arrived (see "Dark mode (2026-09-02)" above). Asked to choose, the owner chose to **keep both themes** — bigger scope than the brief itself specifies, since it means designing a light-mode counterpart to a palette that was written dark-only. The mapping below is that counterpart; it hasn't been through the same live-review pass the rest of this system has, so treat the light-side values as provisional until Phase 8's Lighthouse/contrast pass confirms them, the same rigor already applied to every other token in this file.

**Fonts:** the brief specifies `next/font/google` for Bodoni Moda + Inter Tight. Kept as a deliberate substitution, not asked about separately: this project self-hosts fonts via `next/font/local` specifically for reliability in Morocco (documented above, under Typography) — that reasoning doesn't change because the reference changed. **Decision: self-host the same three families the brief names** (Bodoni Moda, Inter Tight, IBM Plex Mono) via local `.woff2` files instead of a Google Fonts request. Visual outcome is identical; only the loading mechanism differs.

### Retained tokens — same 8 names, reskinned per theme

The existing token *names* and *roles* (`paper`, `surface`, `ink`, `graphite`, `steel`, `rule`, `accent`, `signal`) are kept rather than adopting the brief's `ink-900…ink-400` naming — renaming eight tokens sitewide across every component that already consumes them (`Button`, `Card`, `Section`, `Rule`, `Tag`, …) would be pure churn for no visual difference. Only the values change, per theme:

| Token | Light (new) | Dark (new) | Role |
|---|---|---|---|
| `--paper` | `#F2F5FC` | `#050A1C` (brief `ink-900`) | page background |
| `--surface` | `#FFFFFF` | `#0D1836` (brief `ink-500`) | card/raised surfaces |
| `--surface-hover` *(new)* | `#E7ECFA` | `#122048` (brief `ink-400`) | surface hover state |
| `--ink` | `#0A1533` (brief `ink-700`, reused as light-mode text) | `#EAF0FF` (brief `paper`) | primary text |
| `--graphite` | `#33415E` | `#8FA3C8` (brief `paper-dim`) | secondary text |
| `--steel` | `#5B6B8C` | `#6E80A6` | tertiary text/captions |
| `--rule` | `rgba(10,21,51,.10)` | `rgba(234,240,255,.08)` (brief exact) | hairline borders |
| `--accent` (brass, replaces petrol) | `#7A5A18` | `#E4C07A` (brief exact) | links, buttons, borders, data emphasis |
| `--signal` | `#2F5FD9` | `#3E7BFF` (brief exact) | focus ring + halo glow **only** — see role change below |

Contrast, computed directly (WCAG relative-luminance formula, not eyeballed):
- Light ink/paper 16.5:1, graphite/paper 9.4:1, steel/paper 4.9:1, brass/paper 5.8:1 — all pass 4.5:1 text minimum.
- Dark brass/paper 11.4:1, dark graphite("paper-dim")/paper 7.7:1, dark signal/paper 5.1:1, light signal/paper 5.1:1 — all pass.

**Role change, flagged explicitly:** today, `--signal` is amber and *is* used as text (KPI headline figures). The brief's `signal` is blue and is "halo/focus only, never text" — the brief's `brass` takes over what `--signal` currently does (data emphasis). This is a **semantic swap**, not just a new hex: every current `text-signal` KPI-figure usage becomes `text-accent` (brass) in the new system, and `--signal` stops being used as a text color anywhere. Worth a second look before Phase 1 lands it, since it touches every `<Stat>`/KPI in the codebase.

**Unchanged, because already compliant:** border-radius stays capped at 2px (`--radius-hairline`) — the brief's "2px max, découpé, pas arrondi" rule already matches this system; no token change needed. The `--radius-pill` exception (`SkillsToolbox`) stays as-is unless a later phase says otherwise.

**Resolved since:**
- ~~Motion architecture~~ — Phase 7, see below.
- ~~Case-study hero meta line~~ — Phase 6 reintroduced it (category filet + h1 + période/organisation/rôle mono line), per the brief's explicit `/projets/[slug]` spec.
- ~~`/cv`~~ — Phase 6 checkpoint: kept as the instant-redirect `route.ts`, no intermediate page. The brief's "page de téléchargement" spec doesn't apply; owner confirmed the redirect's speed matters more here.
- ~~`/competences`~~ — Phase 6 checkpoint: kept `SkillsToolbox` and the 6-group Preuves-par-domaine structure (too recent/deliberate, and the brief's 4-section/per-skill-evidence version needs data — which skill maps to which case study — that doesn't exist yet). Only heading-scale updates landed.

**Still open:**
- **Confidential imagery** (Phase 4/10): the brief's asset list requests a Power BI capture for the Stellantis block — allowed only blurred/anonymized per the existing confidentiality rules above, and still needs the convention-de-stage check CLAUDE.md flags for Stellantis content.
- **Demos** (`/demos/consommables`, `/demos/pilotage`) aren't mentioned in the brief. Left out of the redesign scope unless asked for.

No reference screenshot was attached to the brief in this session — the above is built from the brief's written description only.

---

## Phase 7 — Motion pass

**Motion engine decision: no `framer-motion`.** Every phase since Phase 3 (page transitions) needed a piece of the brief's motion system and each was built as pure CSS or a small hand-rolled hook instead — the hero orchestration (Phase 4), the logo marquee (Phase 5), every hover/focus micro-interaction (Phase 2 forward). That's six phases of precedent for "dependency-free unless something structurally requires a library," and framer-motion was never structurally required: `requestAnimationFrame` handles the two pieces that need continuous JS control (counters, parallax) just as well, at zero bundle cost, which matters more on this site than usual — PRD §2 names a phone-scanning HR reviewer as one of two target readers. Deciding now, not deferring again.

**What's JS-driven (the only things that must be):**
- **`<Stat>` count-up** (`components/ui/Stat.tsx`): only the `number` branch counts — `useEffect` + `requestAnimationFrame`, eased with `--ease-plot`'s cubic-bezier evaluated by hand, `once: true` via `IntersectionObserver`. The `string` branch (every real KPI in this codebase — case-study `kpis` arrive pre-formatted, e.g. `"−33,8 %"`) renders statically; there's nothing to count up in a station code or a methodology name. The numeric branch is correct and demonstrated live at `/styleguide`, but no shipped content exercises it yet — flagging so this isn't mistaken for a bug later.
- **Parallax** (`components/ui/Parallax.tsx`, new): a scroll listener (rAF-throttled, `passive: true`) driving a CSS custom property consumed by `transform: translateY(var(--parallax-y))`. Disabled below 1024px and under `prefers-reduced-motion` by not attaching the listener at all, not just zeroing the CSS. Used on exactly two elements per the brief's §5.4 list — the hero background photo and the case-study feature's `FramedImage`. The third (contour-line texture) was never built — it's explicitly optional in the brief and no such texture exists yet.
- **Scroll-progress bar** (`components/case/ScrollProgress.tsx`, new): same rAF-throttled listener pattern, `/projets/[slug]` only, per §5.9.

**Everything else stays CSS**, unchanged from how it already worked: reveals, hover/focus states, the marquee (now also pausing via `IntersectionObserver` when scrolled out of view, per §5.11, not just on hover), page-transition entrance.

**Reveal density, brought down to the brief's §5.3 list.** The homepage previously wrapped nearly every section in `<Reveal>` — exactly the "default reflex" the brief calls out as a tell. Cut to the five elements it names: the Bloc 4 heading, the Bloc 5 image, the Bloc 5 stat band, the Bloc 7 timeline, and the Bloc 8 contact block. Everything else (logo rail, the Bloc 3 note, the featured-projects grid itself, the competence list) is visible immediately.

---

## Phase 8 — Quality pass and delivery

Every custom `:hover` gesture introduced by this redesign (`.sweep-fill`, `.btn-ghost`, `.nav-link` underline, `.competence-row` rule, `.cta-arrow`/`.cta-arrow-down`) is now gated behind `@media (hover: hover)`, with `:focus-visible` kept always-active in parallel — per §5.5's "no hover state stuck after a mobile tap." Added the one missing §5.5 micro-interaction (`ProjectCard`'s image scale-on-hover). `/styleguide` is deleted — its job (checking tokens/primitives live before the rest of the site used them) is done.

**Recette checklist (§12), verified:**
- `npm run build` clean; zero new ESLint/TS warnings in application code (the only warnings anywhere are pre-existing, in `.claude/skills/impeccable/scripts/*.mjs`, outside the Next.js app).
- All 8 routes resolve in both locales against a production build (`npm run start`) — zero 404s, `/cv`'s 307→200 redirect confirmed to actually reach the PDF.
- Zero new dependencies beyond the pre-approved `framer-motion`, which turned out not to be needed at all (Phase 7) — `git diff main -- package.json` is empty.
- No case-study content text modified — every `content/*.mdx` diff against `main` is either the owner-approved Stellantis kpi addition or an unrelated pre-existing pending edit this redesign never touched.
- Contrast was computed directly (not eyeballed) for every token pair back in Phase 0/1.
- Reduced-motion, keyboard navigation, and the live scroll-driven behaviors (parallax, counters, marquee pause) could not be exercised live in this session — verified by code review instead. Root cause, confirmed directly in Phase 7: this session's automation tab reports `document.visibilityState === "hidden"`, the spec condition that makes browsers suspend `requestAnimationFrame`, throttle `IntersectionObserver`, and (confirmed in Phase 8) drop synthetic keyboard focus movement. Not a property of a real visitor's foreground tab.

**Not independently verified this session** (no tooling access to run them): cross-browser rendering at the brief's named breakpoints (320/375/768/1440/1920px — `resize_window` didn't take effect reliably in this environment), and real-device 60fps/CPU-throttled scroll profiling. The code follows the practices those checks would verify (transform/opacity-only animation, `next/image` throughout, self-hosted fonts, mobile-first responsive classes sitewide) but the numbers themselves are unmeasured — worth running for real before calling this fully done.

**Addendum — real Lighthouse pass (`0ff277c`, before merge):** a genuine `lighthouse` CLI run (mobile, throttled, against a real `npm run start` production server — not a sandboxed/simulated tab) found and fixed three real issues: a contrast regression in the logo rail (opacity applied to the whole subtree, including caption text — 96→100 Accessibility), missing `fetchPriority="high"` on every LCP-candidate image (89→91-93 Performance), and a heading-order gap on `/projets` (h1→h3 with no h2 — 98→100 Accessibility). Final scores across three page archetypes: Performance 91-93, Accessibility 100, Best Practices 100, SEO 92 — SEO's gap is a pre-existing async-metadata-streaming pattern from the original M2 scaffold, not something the redesign introduced.

**Addendum — build-breaking bug found and fixed post-Phase-8, before merge (`6b00098`):** a clean Vercel deploy of this branch failed with `Module not found: Can't resolve './ThemeToggle'`. Root cause was **not** a redesign regression — `components/layout/ThemeToggle.tsx` and `components/skills/SkillsToolbox.tsx` (2026-09-02, pre-dating this redesign) had never been `git add`-ed by anyone, so they existed locally but not in any commit; Vercel's fresh clone exposed it where a local build never would (untracked files still exist on disk locally). Verified fixed via a clean `git worktree` checkout (mirrors a fresh clone exactly) + `npm install` + `npm run build`, all before merging.

Two files remained intentionally uncommitted on the `feat/refonte-visuelle` branch at the time of that merge, same reasoning as every prior phase: `messages/{fr,en}.json` (that redesign's new interface-label keys, interleaved with unrelated pending M7 translation work) and `.claude/CLAUDE.md` (a redesign-status pointer note, interleaved with unrelated pending M7 documentation). Both were picked up by later, unrelated commits on `main` before the 2026-09-05 redesign below started — moot as of this section.

---

## Redesign — video-reference clone (2026-09-05), complete, uncommitted

**Status: built, verified via dev server + `npm run build`, not yet committed.** Full visual-world replacement, superseding the blue-night/brass system above (Phases 0–8, merged `4924f85`) in turn — everything under "Redesign — complete and merged (2026-09-02)" through "Phase 8" above is now the **previous** system, kept for history exactly as that section itself kept the original pre-redesign values before it. This section is the current authority; `git diff` against `4924f85` is the full before/after if anything above is unclear.

**Source of truth:** a 52-second LinkedIn video the owner supplied (`linkedin-video-444kbps.mp4`), showing a black-ground/red-accent personal "data scientist" portfolio template (name-mark "SREEJITH"). 63 frames were extracted via `ffmpeg` (installed this session, `winget install Gyan.FFmpeg`) at ~1.2fps and reviewed directly — not a written brief this time, a real screen recording. This is a **pinned reference**, not an open aesthetic choice: per the owner's explicit sign-off (asked via structured questions before building, given the direct conflict with this project's own "no percentage bars," "no marketing adjectives," and anti-brand rules in PRD §3.5/§8.1), the reference's look was cloned as directed rather than softened toward the prior system.

**Scope decisions, confirmed with the owner before building:**
- **Multi-page architecture kept** — the reference is a single-page anchor-nav site; this portfolio's bilingual, multi-route structure (`/`, `/projets`, `/projets/[slug]`, `/parcours`, `/competences`, `/contact`) is unchanged. Each route was restyled in place, not collapsed into one scrolling page.
- **Real KPI values only** — the reference leans on percentage stat cards and skill checklists; this system keeps every real KPI already in the case-study/skills data (e.g. the Stellantis `−33,8 %` scrap-cost figure) and restyles only the *visual* stat-card treatment. No invented percentages were added anywhere.
- **Dark-only** — the reference never shows a light mode. `ThemeToggle.tsx` is deleted and the light/dark toggle is retired rather than inventing an untested light counterpart; `:root` carries the dark values directly with no `@media`/`[data-theme]` branching.
- **Photo pending** — the reference's hero uses a personal B&W cutout photo standing in front of the giant name. The owner will supply one; `Hero.tsx` checks for `public/images/hero-cutout.png` at build time (`fs.existsSync`, server component) and falls back to the existing `.hero-grid-bg` technical-grid pattern when it's absent, so the hero ships looking deliberate rather than broken either way. **Still open**: drop the real photo in at that path once available.
- **No AI chat widget** — the reference's floating chat bubble was explicitly declined.

**New tokens (same 9 names/roles as the blue-night/brass system, all-new hex, dark-only):**

| Token | Value | Role |
|---|---|---|
| `--paper` | `#0a0a0a` | page background |
| `--surface` | `#141414` | card/raised surfaces |
| `--surface-hover` | `#1e1e1e` | surface hover state |
| `--ink` | `#f5f5f5` | primary text |
| `--graphite` | `#b4b4b4` | secondary text |
| `--steel` | `#8a8a8a` | tertiary text/captions |
| `--rule` | `rgba(255,255,255,.12)` | hairline borders |
| `--accent` | `#ff3b3b` | the system's one saturated color — links, KPI figures, active nav, card-hover border, category labels |
| `--signal` | `#ffb020` | kept for its existing role in the two live demos (error/alert states, chart highlights) — repointed to amber so it reads as a distinct "alert" tone from the brand red, not a second brand color |

Contrast computed directly (WCAG relative luminance): ink/paper 18.1:1, graphite/paper 10.4:1, steel/paper 6.3:1, accent/paper 6.0:1, signal/paper 11.6:1 — all clear 4.5:1. `--shadow-halo` is now a red-tinted glow (`0 0 80px -20px rgba(255,59,59,.45)`), generalizing the reference's one glowing skill card into the system's card-hover/`.glow-card` treatment.

**Typography — display face fully substituted, not reskinned.** Bodoni Moda (serif) is replaced by **Archivo Black**, self-hosted (`public/fonts/archivo-black/`, fetched once from Google Fonts' latin subset, same convention as every other family here) — the reference's headings and giant hero name are a heavy grotesque, and no serif appears anywhere in 63 reviewed frames, so this is a full substitution rather than a weight/style tweak. Body (Inter Tight) and data/mono (IBM Plex Mono) are unchanged — the reference's own body copy is a plain clean sans close enough to Inter Tight to reuse the existing self-hosted asset, and the sitewide "every number is mono" rule (PRD §8.3, unaffected by this redesign) doesn't conflict with a black/red palette. Bodoni Moda's files stay on disk pending cleanup, same rollback posture as every prior font swap here.

**New type-scale step:** `--text-giant` (`clamp(44px, 15vw, 300px)`, line-height 0.82) — the homepage hero's giant background surname, the reference's signature device. Its own step, well above `--text-hero`, since nothing else on the site runs this large. The clamp minimum is deliberately far below the reference's own near-full-bleed ratio: at the reference's proportions a 9–11 letter surname (`ELBOUAMRI`) would overflow a 390px phone viewport before wrapping, so `.hero-giant-name` also carries `overflow-wrap: anywhere` as a safety net. `resize_window` was unreliable for verifying this live in this session's tooling (same limitation Phase 8 hit) — the fix is a defensive CSS value, not something confirmed pixel-for-pixel at 390px.

**Components:**
- **`Hero.tsx` — full rewrite.** Giant background surname (`.hero-giant-name`, red, `text-giant`) → portrait cutout mounted on top (`.hero-photo-mount`, bottom-anchored, photo-existence-checked as above) → foreground eyebrow/name/role/CTA stack, in that entrance order (structure resolves, then content stamps in, same principle the old Cartouche/hero motion followed, new choreography). A vertical social-icon rail (LinkedIn, email — reusing Footer's inline SVGs) sits on the right edge, desktop only, echoing the reference's floating icon column. Replaces the previous centered-stacked-name hero entirely; every `hero-photo-mask`/`hero-halo`/`hero-mark`/`hero-name-line`/`hero-rule` class from the blue-night/brass hero is gone with it.
- **`Button.tsx` — variant remap, not a new component.** `ghost` now renders a white-outlined (`border-ink/30`) transparent button (was `border-accent`) that sweeps to accent red on hover/focus; `solid` now renders filled white (`bg-ink text-paper`, was `bg-accent text-on-accent`) sweeping to accent red on hover. This mirrors the reference exactly — hero CTAs are white-outlined, the one true "primary" action (`Contact.form_submit`) is filled white — and works with no hover text-color swap, since the dark label already clears 4.5:1 on white and on red alike (5.9:1+ either way). `CvButton.tsx` (a separate, deliberately-persistent-in-header component, not `Button.tsx`) keeps its own `bg-accent` fill unchanged — the header's one rationed red highlight, same "at most one strong accent per view" principle the amber rule used to enforce.
- **`.glow-card` (new).** The reference's single glowing "Data Analytics & Tools" skill card, generalized as a reusable modifier (`border-color: var(--color-accent); box-shadow: var(--shadow-halo)`) rather than a one-off. Rationed the same way the amber rule was: at most one glow-card per visible group. Currently used once, on `ExpertiseGrid`'s "Industrie 4.0 & Data" card (the positioning's stated scarcity value, PRODUCT.md) — not on every skill/competence card, which would dilute it into decoration.
- **`ProjectsHeroBand.tsx` — simplified, stock image retired.** The reference's `/projets`-equivalent header is a plain centered heading with a short accent rule beneath it, no photo band. Replaces the 2026-09-01 stock-photo band (`public/images/projets-hero-gears.webp`, left on disk unreferenced rather than deleted — owner-supplied asset, licensing was already the owner's responsibility per that era's note) and retires its `.font-editorial`/Georgia serif exception along with it — no component anywhere sets a serif face now.
- **Contact page** — enhanced, not rebuilt: the existing two-column detail/form layout gained a `contact_availability` status pill (dot + label, reusing the existing i18n string) and turned the plain `<dl>` of contact methods into individual bordered link cards, echoing the reference's contact-method mini-cards without inventing new copy.

**Unchanged:** confidentiality rules, all case-study content and KPI values, the 12-block case-study skeleton, bilingual routing, the contact form's validation/honeypot/rate-limit, both feature-flagged demos (left out of scope, same precedent as the 2026-09-02 redesign's own Phase 0 note — neither the video nor the owner's scoping answers mentioned them), and every accessibility mechanism (focus rings now `--color-accent`-only since `--signal` dropped its focus-ring role in favor of staying the demos' alert color — contrast reverified above).

**Verification this session:** `npm run lint` (0 errors, 146 pre-existing warnings, all in `.claude/skills/*.mjs` — none in application code) and `npm run build` (clean, all 56 static pages, MDX frontmatter schema intact) both pass. Manually reviewed via a live dev server + browser screenshots: homepage (hero, logo rail, featured projects, expertise grid with the one glow-card, timeline, contact block), `/projets` index and category filters, a full case-study detail page (header, KPI stat grid, prose, next-project link), `/competences` (skill pill grid, level legend, category tabs), `/contact`, `/parcours`, and the `/en` locale. No console errors traced to this redesign (one exception observed, `Language detection is not supported for this page`, is a browser-extension artifact, not app code). **Not verified**: real mobile-viewport rendering (`resize_window` unreliable in this session's tooling, same limitation as Phase 8) — the CSS follows mobile-first practice throughout and the giant-name overflow case specifically was hardened defensively (see `--text-giant` above), but real-device confirmation is still owed. The two feature-flagged demos were not opened (confirmed still correctly 404 when their flags are off; not re-verified with flags on, since neither was in scope).

**Addendum — follow-up pass, same day:** three owner requests handled after the initial build above.
- **GitHub added alongside LinkedIn/email.** A `GitHubIcon` (inline SVG, matching the existing `LinkedInIcon`/`MailIcon` convention) and a link to `https://github.com/badrbouamri` — inferred directly from this repo's own `git remote` (`github.com/badrbouamri/portfolio.git`), not asked separately — now appear in `Footer.tsx`, `Hero.tsx`'s social rail, and the Contact page's coordinates list, each behind a new `github_label` i18n key (both locales).
- **Organisation logos — per-logo legibility fix, not a blanket rule.** The owner asked for original colors with no white background. Sampling actual pixel values from all four PNGs found two that can't survive that literally: Stellantis' wordmark is entirely navy-blue (~2:1 contrast on black, fails even large-text 3:1) and ENSET's subtitle line is true black text (fully invisible on black). Nexteer (red) and AIC (red/yellow) clear 4.5:1 with zero background and needed no change. Resolution, chosen by the owner from three options: `OrganisationInfo` (`lib/organisations.ts`) gained a `needsLightPlate?: boolean` flag, set only on Stellantis and ENSET; `OrgLogo.tsx` renders those two in a small, tight light chip (not a full card) and the other two directly on the page background, in full original color, no grayscale-at-rest treatment anywhere (removed sitewide, including the Parcours timeline's inline logos, which previously used `grayscale opacity-70` unconditionally).
- **Section padding halved sitewide.** Screenshotting the built homepage found genuine dead space — two adjacent non-`tight` `<Section>`s stacked 168px+168px of padding into a 300px+ blank gap (worst case: LogoRail → the positioning-note paragraph). `.section` dropped from 96/168px (mobile/desktop) to 56/96px, `.section-tight` from 32/56px to 16/24px, and the homepage's LogoRail block picked up `tight` (a thin marquee doesn't need full-section breathing room). Verified via `getBoundingClientRect()` in the live browser, not eyeballed: every homepage/`/competences` section now sits exactly flush against its neighbor (0px gap), confirmed page-by-page.

Verified again after this pass: `npm run lint` (still 0 errors, 146 pre-existing warnings) and a clean `npm run build` (56/56 static pages) both pass; the GitHub links and both fixed/unfixed logo treatments were confirmed live in the browser on the homepage, `/parcours`, and `/contact`.
