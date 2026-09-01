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

## Redesign in progress (2026-09-02) — `BRIEF-REFONTE-PORTFOLIO.md`, Phase 0

**Status: everything below is a Phase-0/checkpoint-1 proposal, not yet implemented.** No component, token, or dependency has changed. This section records the audit, the conflicts found against the system above, and how each was resolved after checking in with the owner — before any code is touched in Phase 1.

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

**Explicitly deferred to their own phase, not decided today:**
- **Motion architecture** (Phase 7, not Phase 1): whether to add `framer-motion` per the brief and replace `Reveal.tsx`, or extend the existing CSS/`IntersectionObserver` `Reveal` + the "Plotter Rule" vocabulary to cover the brief's hero orchestration, parallax, and counters. The brief's own §5.3 rule ("only 5 elements reveal on scroll, not every section") is stricter than today's usage and will need a pass regardless of which engine wins.
- **Case-study hero meta line** (Phase 6): the brief's `/projets/[slug]` plan reintroduces a période/entreprise/rôle line that `CaseHero` deliberately dropped on 2026-09-01. Needs a decision before Phase 6, not before Phase 1.
- **Confidential imagery** (Phase 4/10): the brief's asset list requests a Power BI capture for the Stellantis block — allowed only blurred/anonymized per the existing confidentiality rules above, and still needs the convention-de-stage check CLAUDE.md flags for Stellantis content.
- **`/cv`** is currently a `route.ts` (direct file serve), not a page — the brief's "page de téléchargement" assumes a page. Reconcile in Phase 6.
- **Demos** (`/demos/consommables`, `/demos/pilotage`) aren't mentioned in the brief. Left out of the redesign scope unless asked for.

No reference screenshot was attached to the brief in this session — the above is built from the brief's written description only.
