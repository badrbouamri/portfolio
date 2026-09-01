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

### Cards (ProjectCard)
- **Corner Style:** 0px radius.
- **Background:** `--surface` on `--paper`.
- **Border:** 1px `--rule` at rest, swaps to `--accent` on hover/focus.
- **Shadow Strategy:** none at rest; on hover, a flat 4px `--rule` step-shadow plus a 2px upward translate (see Elevation).
- **Internal Padding:** 16px (`--spacing-2`).
- **Content pattern:** category tag → title (display face, `--text-md`) → mono metadata line (organisation · period) → summary (`--graphite`, 3-line clamp) → headline KPI in `--signal` mono → tool chips → mono CTA in `--accent` with a directional arrow that nudges 3px on hover.

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
