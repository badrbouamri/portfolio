# Portfolio redesign brief — restructure toward the Stevens reference

Reference: https://johnduncanstevens.wixsite.com/portfolio

**Goal:** adopt the reference's information architecture and content depth. Do **not** adopt its
visual style. Keep the existing identity (BE· mark, current type scale, current colour system) and
keep the FR/EN i18n — every new string ships in both locales.

---

## 1. What to take, and what to skip

**Take:**

| Element | Why |
|---|---|
| Rated skills matrix (categories + proficiency level per tool) | The single biggest gap. "SolidWorks" alone says nothing; "SolidWorks — Expert" is evidence. |
| Dated timeline entries with employer/school logo | Turns a CV list into something scannable. |
| Grouped bullets inside each entry (Coursework / Involvement / Awards) | Lets one entry carry depth without a wall of text. |
| Logo strip near the top (schools, tools, certifying bodies) | Instant credibility above the fold. |
| Awards section | Currently missing. |
| Interests section | Humanises an otherwise dry engineering page. |
| Portrait photo in the hero | The reference leads with a face; the current hero is text-only. |
| Project thumbnail grid on the homepage | Currently the projects live one click away. |

**Skip:**

- The unlabeled three-tick proficiency bars repeated per category — replace with one legend at the
  top of the section and a consistent bar or pip row per skill.
- Wix's centre-aligned, evenly-weighted type. Keep the current asymmetric hero.
- The single-page-scroll-with-anchors pattern *if* the project case studies stay as real pages
  (they should — they're the strongest content).
- The generic tagline format (`Role | Enthusiast | Creator`). The current subtitle is more specific.

---

## 2. Section spec

Order on the homepage:

1. **Hero** — keep as-is, add a portrait (square or 4:5, right-aligned on desktop, above the text
   on mobile). Keep the CV download button.
2. **Credibility strip** — a single quiet row of logos: ENSET Mohammedia, CATIA / Dassault,
   SOLIDWORKS, Lean Six Sigma. Grayscale at rest, colour on hover. No heading.
3. **Featured projects** — 3 cards linking to the existing case studies
   (`conception-mecanique-catia-v5`, `diagnostic-amdec-injection-plastique`,
   `etude-thermodynamique-turbine-vapeur`). Each card: thumbnail, title, one-line outcome, 2–3
   method tags.
4. **About / Parcours intro** — 3–4 short paragraphs. Eyebrow label, then prose. Keep paragraphs
   under 60 words each; the reference's paragraphs are too long.
5. **Education** — reverse chronological.
6. **Experience** — reverse chronological, same visual pattern as Education.
7. **Skills matrix** — see §3.
8. **Certifications** — the existing certifications block, now sitting next to Awards.
9. **Awards & Interests** — two columns on desktop, stacked on mobile.
10. **Contact** — email, LinkedIn, CV download.

`/parcours` and `/competences` stay as full pages; the homepage sections are condensed versions
that link through.

---

## 3. Skills matrix — the important one

Six categories, each with rated entries. Proposed grouping for a mechanical/industrial profile:

- **CAO / Conception** — CATIA V5, SOLIDWORKS, AutoCAD
- **Méthodes & industrialisation** — gammes de fabrication, équilibrage de ligne, chronométrage,
  implantation de poste, temps standards
- **Qualité & fiabilité** — AMDEC, 8D, MSP/SPC, plans d'expérience, GD&T
- **Lean Manufacturing** — VSM, 5S, SMED, Kaizen, Kanban, TPM
- **Simulation & calcul** — éléments finis, thermodynamique appliquée, mécanique des fluides
- **Data & outils** — Excel avancé, Python, Power BI, ERP/GPAO

Three levels: `Notions` / `Maîtrise` / `Expert` (EN: `Introduced` / `Proficient` / `Expert`).
One legend at the top of the section, not per category.

Data shape:

```ts
// content/skills.ts
export type Level = 'notions' | 'maitrise' | 'expert'

export type SkillCategory = {
  id: string
  labelKey: string          // i18n key, not a literal
  skills: { nameKey: string; level: Level }[]
}
```

Render each skill as a row: name left, three pips right, filled to the level. Filled pips use the
existing accent; empty pips use a muted border. Not a percentage bar — percentages on a CV imply a
precision that doesn't exist.

---

## 4. Timeline entry shape

Education and Experience share one component.

```ts
export type TimelineEntry = {
  id: string
  period: string            // "2020 – 2024" — same string both locales
  org: string
  location: string
  titleKey: string          // degree or role
  logo?: string             // /public/logos/*.svg
  groups: {
    labelKey: string        // "Coursework" / "Involvement" / "Awards"
    itemKeys: string[]
  }[]
}
```

Layout per entry: period as a small monospace or letter-spaced label in a narrow left column, the
rest in the main column, logo top-right at a fixed height (~40px) so different aspect ratios don't
make the column ragged. A hairline rule between entries, not cards.

---

## 5. Design guardrails

- Do not introduce a new colour palette or new fonts. Everything new is built from the existing
  tokens.
- Spend the visual budget in one place: the skills matrix. It should be the thing someone
  remembers. Everything around it stays quiet.
- Motion: scroll-reveal on section entry at most, and respect `prefers-reduced-motion`. No
  staggered animation on every list item.
- Every new section must be readable at 375px width. The timeline's two-column layout collapses to
  single column below `md`.
- Logos need `alt` text and visible keyboard focus on any that link out.

---

## 6. Assets to supply before building

- [ ] Portrait photo, square or 4:5, at least 1000px
- [ ] Logos: ENSET Mohammedia, plus any employer/internship organisations
- [ ] Thumbnail for each of the 3 case studies (a render or photo, not a screenshot of text)
- [ ] Final list of awards, with year and issuing body
- [ ] Interests list (8–12 items)
- [ ] Confirmed proficiency level for every skill in §3

---

## 7. Suggested order of work

1. Build the skills matrix section standalone and review it before anything else — it's the piece
   most likely to need iteration.
2. Build the shared timeline component; wire Education and Experience through it.
3. Add the credibility strip and the homepage project grid.
4. Add Awards & Interests.
5. Add the portrait to the hero.
6. Full i18n pass — confirm no hardcoded strings, check EN and FR at 375px and 1440px.
