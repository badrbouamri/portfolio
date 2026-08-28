# PRD — Portfolio professionnel · Badr Eddine ELBOUAMRI

**Version:** 1.0
**Date:** 22 August 2026
**Owner:** Badr Eddine ELBOUAMRI
**Build method:** Claude Code → GitHub → Vercel
**Status:** Approved for implementation

> **How to use this document.** Sections 1–8 are strategy and content — read them, they shape every decision. Sections 9–13 are the implementation spec. When prompting Claude Code, paste section 9 (Technical Architecture) plus section 8 (Design) as the build instruction, and section 6 (Case Study Structure) as the content schema. Do not paste the whole document at once; build page by page.

---


## 1. Product Overview

### 1.1 Portfolio name

**`badreddine-elbouamri.com`** — full name as domain. In conservative Moroccan industrial recruiting, a `.com` with your real name is the highest-trust signal. Fallbacks if unavailable: `elbouamri-badreddine.com`, then `belbouamri.com`. Launch on the free `*.vercel.app` subdomain if the domain purchase is delayed — do not let a domain block the launch.

Site title (metadata): `Badr Eddine ELBOUAMRI — Ingénieur Méthodes & Industrialisation`

### 1.2 Product vision

A fast, sober, bilingual portfolio that converts a recruiter's 30-second glance into a 3-minute read, and gives an engineering manager concrete material to interrogate during an interview. Not a personal website — a professional proof system.

### 1.3 Purpose

Secure a first engineering position in Moroccan automotive/industrial manufacturing, positioned as **Ingénieur Méthodes & Industrialisation**, with Lean/continuous improvement as proven secondary competence and digital/Industry 4.0 capability as the differentiator.

### 1.4 Main problem it solves

A one-page CV cannot prove engineering reasoning. Bullets like *"réduction de 33,8 % du coût de rebut"* and *"validation des gammes"* are unverifiable claims sitting in a stack of 200 near-identical ENSET/ENSAM/EMI CVs. The portfolio replaces claims with demonstrated method: how the root cause was found, what was decided, what was built, what changed.

### 1.5 Unique value proposition

> **A mechanical engineer who masters the shop floor and builds the tools that run it.**

Three-part claim, each provable on the site:

1. **Méthodes credibility** — has personally produced workstation layouts and work standards/gammes in an automotive plant (Stellantis).
2. **Lean rigour** — full DMAIC deployment with a quantified result (−33.8% scrap cost).
3. **Digital capability** — builds Power BI dashboards, web applications, and IoT systems himself, with live demos to prove it.

Point 3 is the scarcity. Points 1–2 make him hireable; point 3 makes him memorable.

### 1.6 Explicit non-goals

- Not an application channel (applications go through ATS, LinkedIn, cabinets, referrals).
- Not a blog-first personal brand play (see 7.9).
- Not a showcase of Bureau d'Études / pure CAD design capability (secondary at most).
- Not a place to publish any Stellantis, AIC Métallurgie, or Nexteer proprietary data.

---

## 2. Target Audience

Ordered by influence on the hiring outcome.

| # | Persona | Context of visit | Time on site | What they need in that time |
|---|---|---|---|---|
| 1 | **Responsable / Chef de service Méthodes** (35–50, French-speaking, engineer) | Sent the link before or during an interview; or clicked from a CV PDF | 3–8 min | Evidence of real deliverables: a layout, a standard de travail, a structured problem-solving approach. He is looking for reasons to *believe*, not to reject. |
| 2 | **Chargé(e) de recrutement / HR** (25–40, non-technical, screening volume) | LinkedIn profile → website link | 20–60 s | Instant clarity: who is this, what role, what school, is he serious, where is the CV. Mobile, one thumb. |
| 3 | **Cabinet de recrutement** (Michael Page, Rekrute, LinkedIn recruiters) | Sourcing for a client brief | 1–3 min | Keyword match, availability, mobility, downloadable CV to forward to the client. |
| 4 | **Ingénieur Méthodes / Amélioration Continue peer** (future colleague on the panel) | Asked to technically vet the candidate | 5–15 min | Depth. Does the AMDEC logic hold? Does the Pareto make sense? Is the dashboard real work or decoration? |
| 5 | **Responsable Production / Plant Manager** | Final round | 2–5 min | Business impact and pragmatism, not method vocabulary. Numbers and outcomes. |
| 6 | **Professional network / ENSET alumni** | LinkedIn post sharing | 1–2 min | Something worth sharing — which drives inbound opportunity. |

**Design implication:** personas 1 and 2 have opposite needs (depth vs. speed). The homepage serves persona 2; the case studies serve persona 1. Never compromise one for the other — layer them.

---

## 3. Professional Positioning

### 3.1 Professional identity

Ingénieur d'État en Génie Mécanique des Systèmes Industriels (ENSET Mohammedia, Université Hassan II, 2026), specialising in production process optimisation — from defining gammes and workstations to data-driven performance monitoring.

### 3.2 Engineering specialisation

- **Primary:** Méthodes & Industrialisation — gammes, standards de travail, implantation de poste, maîtrise des procédés, suivi par KPIs.
- **Secondary:** Amélioration Continue / Lean Six Sigma — DMAIC, AMDEC, Pareto, Ishikawa, 5 Pourquoi, QQOQCCP, SIPOC, 8D, Kaizen, 5S.
- **Tertiary:** Maintenance & Fiabilité — diagnostic mécanique, maintenance préventive/corrective.
- **Differentiator:** Industrialisation numérique — Power BI, développement web, Python, IoT.

### 3.3 Target industries

1. Automotive OEM & tier-1 (Stellantis Kénitra, Renault Tanger/Casablanca, Nexteer, Lear, Yazaki, Aptiv, Sumitomo, Valeo, Denso, Faurecia)
2. Métallurgie / transformation métallique (Delta Holding / AIC Métallurgie ecosystem)
3. Aéronautique (Safran, Le Piston Français, Hexcel — Casablanca/Nouaceur cluster)
4. Agro-industrie & industrie de process (secondary)

Geography: Kénitra – Rabat – Casablanca – Tanger corridor. Explicitly state mobility on the site.

### 3.4 Career objectives

- **0–6 months:** first CDI or CDD as Ingénieur Méthodes / Industrialisation / Amélioration Continue in Moroccan industry.
- **2–3 years:** ownership of a process or line perimeter; Green Belt / Black Belt certification.
- **5 years:** Responsable Méthodes or Industrialisation, with a digitalisation/Industry 4.0 mandate.

State the 0–6 month objective explicitly on the site (availability + role sought). Keep the longer horizon for interviews.

### 3.5 Personal brand

**Attributes:** rigorous, method-driven, quantitative, pragmatic, hands-on, curious about digital tools, discreet with confidential data.

**Tone of voice:** professional, direct, factual. First person singular. No superlatives, no "passionate about excellence," no marketing adjectives. Every claim followed by evidence or a number. Where a number is confidential, say so plainly — restraint reads as maturity.

**Anti-brand (things the site must never look like):** student project, agency template, AI-generated startup landing page, over-designed showreel.

### 3.6 Homepage headline (locked)

```
Badr Eddine ELBOUAMRI
Ingénieur d'État en Génie Mécanique des Systèmes Industriels — ENSET Mohammedia
Méthodes & Industrialisation · Lean Manufacturing · Industrie 4.0

J'optimise les process de production industrielle — de la définition
des gammes et des postes au pilotage par la donnée.
```

EN:
```
Mechanical & Industrial Systems Engineer — ENSET Mohammedia
Manufacturing Engineering · Lean Manufacturing · Industry 4.0

I optimise industrial production processes — from defining routings
and workstations to data-driven performance management.
```

Rationale: line 2 carries the credential (ATS, SEO, keeps all four target roles open); line 3 carries the positioning; line 4 spans both the Méthodes world and the digital differentiator.

---

## 4. User Experience

### 4.1 Primary user journeys

**J1 — HR screening (persona 2, mobile, 30 s).**
LinkedIn → homepage → reads headline + 3 KPI facts → taps "Télécharger le CV" → leaves.
*Success:* CV downloaded, name remembered. **Requirement:** CV button visible without scrolling, on mobile.

**J2 — Méthodes manager pre-interview (persona 1, desktop, 5 min).**
CV PDF link → homepage → "Projets" → Stellantis case study → reads Contexte → Démarche → Livrables → Résultats → clicks the dashboard demo → returns → "Parcours".
*Success:* arrives at the interview with a specific question about the case study. **Requirement:** case study must be skimmable by subheading and readable in full in under 4 minutes.

**J3 — Technical peer vetting (persona 4, desktop, 12 min).**
Homepage → Projets → filters by "Méthodes" → reads two case studies → opens the consommables app demo → tests it → checks GitHub.
*Success:* concludes the digital claim is real. **Requirement:** demos must work, and be honest about being rebuilt with synthetic data.

**J4 — Direct inbound (any persona).**
Google search "ingénieur méthodes Kénitra" or name search → homepage → Contact.
*Success:* message sent or email copied. **Requirement:** contact reachable from every page footer.

### 4.2 Navigation structure

Persistent header, 6 items maximum, plus language toggle and a CV action.

```
[BE·] Accueil   Parcours   Compétences   Projets   Contact        [FR|EN]  [CV ↓]
```

- **Accueil** `/fr`
- **Parcours** `/fr/parcours` — experience + education + certifications, one chronological page
- **Compétences** `/fr/competences`
- **Projets** `/fr/projets` → `/fr/projets/[slug]`
- **Contact** `/fr/contact`
- **CV** — direct PDF download action, not a page (tracked event)

Demos live under `/fr/demos/[slug]` and are reached *from within* case studies, not from the main nav. They are evidence, not destinations.

**Mobile:** the header collapses to logo + `[CV ↓]` + hamburger. The CV action never hides inside the hamburger.

### 4.3 Information architecture

```
/
├── /fr  (default locale, root redirects here)
│   ├── /                  Accueil
│   ├── /parcours          Expérience · Formation · Certifications
│   ├── /competences       Compétences techniques, méthodes, outils, langues
│   ├── /projets           Index + filtres
│   │   └── /[slug]        Étude de cas
│   ├── /demos
│   │   ├── /consommables  Application de gestion des consommables
│   │   └── /pilotage      Tableau de bord de suivi du rebut
│   ├── /contact
│   └── /mentions-legales  (confidentiality & data notice)
└── /en  (mirror: /background, /skills, /projects, /demos, /contact, /legal)
```

### 4.4 Homepage composition (order is deliberate)

1. **Hero** — name, credential line, positioning line, value sentence, availability status, two actions: `Voir les projets` (primary) / `Télécharger le CV` (secondary).
2. **Preuves** — three facts, not a slogan bar: `−33,8 %` coût de rebut · `3` stages en milieu industriel (Stellantis, AIC, Nexteer) · `1` application web et `1` tableau de bord déployés en production.
3. **Projets en vedette** — three cards: Stellantis (Méthodes/Lean), one technical/simulation project, one digital project. This trio *is* the positioning argument, visually.
4. **Ce que je sais faire** — four competence blocks with one line of evidence each, linking to the relevant case study. Never a skill bar chart with percentages (unfalsifiable and juvenile).
5. **Parcours condensé** — three-line timeline, link to full page.
6. **Contact** — availability, location, mobility, email, LinkedIn.

---

## 5. Core Pages and Features

### 5.1 Accueil
As composed in 4.4. Must render meaningfully within the first viewport on a 390 px-wide screen.

### 5.2 Parcours *(replaces separate About / Experience / Education pages)*
Merging these avoids three thin pages. Contains:
- Short professional biography (150–200 words, first person, see 10.1)
- Professional photo (the CV headshot, reshot or reused — must be current and neutral)
- Reverse-chronological experience entries, each linking to its case study where one exists
- Education (ENSET-M, CPGE TSI, Baccalauréat STE)
- Certifications (currently empty — see 10.7 and 11.4)
- Languages (Arabe: langue maternelle · Français: courant · Anglais: courant)
- Availability, location, mobility

### 5.3 Compétences
Grouped by function, each with proof, never with percentage bars:

| Group | Content |
|---|---|
| Méthodes & Industrialisation | Gammes et standards de travail · implantation de poste · maîtrise des procédés · validation des gammes · suivi par KPIs · lecture de plans 2D/3D · dessin industriel |
| Amélioration Continue & Qualité | DMAIC · AMDEC · Pareto · Ishikawa · 5 Pourquoi · QQOQCCP · SIPOC · 8D · Kaizen · 5S |
| Maintenance & Fiabilité | Diagnostic mécanique · maintenance préventive et corrective · analyse de pannes récurrentes · calcul d'efforts (pliage, roulage) |
| Conception & Simulation | CATIA V5 · SOLIDWORKS · AutoCAD · ANSYS · ABAQUS · DIGIMAT · CES EduPack |
| Données & Développement | Power BI · Excel avancé/VBA · Python · MATLAB · C/C++ · développement web · IoT (ESP32, MQTT) |
| Sciences de l'ingénieur | Machines thermiques · transfert de chaleur · mécanique des fluides · énergies renouvelables |

Each group carries one short evidence line, e.g. *"Standard de travail et implantation d'un poste de retouche — Stellantis Kénitra →"*.

### 5.4 Projets (index)
Card grid with client-side filtering by category: `Méthodes` · `Lean & Qualité` · `Maintenance` · `Conception & Simulation` · `Digital & IoT`. Each card: title, organisation (or `Projet académique` / `Projet personnel`), period, 1-line summary, up to 3 tool tags, and the headline KPI where one exists. Filtering must update the URL query (`?categorie=methodes`) so a filtered view is linkable.

### 5.5 Étude de cas
See section 6.

### 5.6 Demos
Two standalone interactive pages plus one embedded 3D viewer. See 7.1–7.3.

### 5.7 CV
A single tracked PDF at `/cv/CV_ELBOUAMRI_BadrEddine_FR.pdf` and `..._EN.pdf`. Filename must contain the full name — recruiters save it to a folder of 200 files. Never expose the raw path in nav; route through `/fr/cv` which fires an analytics event then redirects.

### 5.8 Contact
Form (nom, email, organisation, message) + honeypot + rate limit + zod validation, sending via Resend. Plus plain-text email, phone, LinkedIn, and location shown directly — **many recruiters will not use a form**, and a form-only contact page loses leads.

### 5.9 Mentions légales / Confidentialité
Short page stating: data anonymisation policy for industrial projects, no cookies beyond privacy-friendly analytics, contact form data usage. This page is itself a professionalism signal for persona 1.

### 5.10 Blog — deferred
See 7.9.

---

## 6. Project Case Study Structure

Every case study follows the same eleven-block skeleton. Blocks may be short, but the order never changes — repetition is what makes the site skimmable to persona 1.

| # | Block | FR label | Content rules |
|---|---|---|---|
| 0 | Title block | *(cartouche)* | See 8.6 — the signature component. Auto-rendered from frontmatter. |
| 1 | Contexte | Contexte | Where, when, what the plant/workshop does. 60–100 words. Anonymised where required. |
| 2 | Problème | Problématique | The gap, stated as a measurable deviation. 40–80 words. |
| 3 | Objectifs | Objectifs | 2–4 bullets, each with a target. |
| 4 | Mon rôle | Mon rôle | Explicit personal scope. Distinguish "j'ai réalisé" from "j'ai contribué à". Non-negotiable: never claim team output as personal. |
| 5 | Démarche | Démarche & méthodologie | The core block. For DMAIC/8D projects, use numbered phases — the sequence is real information. For non-sequential work, use plain subheadings. |
| 6 | Outils | Outils & méthodes | Tag list, rendered as chips. |
| 7 | Analyse | Analyse d'ingénieur | The reasoning: why this root cause, why this hypothesis rejected, what the calculation showed. **This is the block that gets you hired.** Include at least one figure: Pareto, Ishikawa, AMDEC extract (anonymised), redrawn layout, calculation, or simulation result. |
| 8 | Défis | Difficultés rencontrées | 2–3 honest obstacles and how they were handled. Omitting this block makes the whole case read as sanitised. |
| 9 | Solutions | Solutions mises en œuvre | Concrete deliverables. Name the artefact: *"standard de travail du poste de retouche"*, *"plan de maintenance préventive"*. |
| 10 | Résultats | Résultats | Relative figures only where confidential. Include what was *not* achieved if relevant — credibility. |
| 11 | Enseignements | Ce que j'en retiens | 3–5 lines, first person, specific. No platitudes. |

**Media block** (interleaved, not appended): figures with numbered captions (`Fig. 3 — Diagramme de Pareto des défauts, données indexées`), alt text in both locales, and a `confidential: true` figures carry a visible anonymisation note.

**Confidentiality rules for industrial case studies (hard requirements):**

- Never publish: absolute costs, production volumes in units, internal document screenshots, real part references, supplier names, photographs of lines/postes/robotised cells, Power BI screenshots containing real data, internal project or station codenames beyond what already appears on the public CV.
- Safe to publish: methodology, reasoning, relative/indexed results, redrawn generic schematics, rebuilt dashboards with synthetic data, and the anonymised structure of an analysis.
- Every industrial case study displays a standard notice: *"Données volontairement indexées ou anonymisées par respect de la confidentialité industrielle."*
- **Action required before publishing anything Stellantis-related:** read the confidentiality/IP clause in the convention de stage and confirm the PFE report's confidentiality status at soutenance. This is a legal exposure, not a design preference — verify it rather than relying on this document's assumptions.

**Content schema (zod-validated MDX frontmatter):**

```ts
{
  slug: string
  locale: 'fr' | 'en'
  title: string
  subtitle: string                    // ≤ 90 chars
  category: 'methodes'|'lean'|'maintenance'|'conception'|'digital'
  organisation: string                // or "Projet académique — ENSET-M"
  organisationPublic: boolean         // false → render as "Équipementier automobile"
  location: string
  period: { start: string; end: string }
  durationLabel: string               // "6 mois"
  role: string                        // "Stagiaire Ingénieur Amélioration Continue (PFE)"
  summary: string                     // ≤ 240 chars, used in cards + meta description
  featured: boolean
  order: number
  confidential: boolean
  tools: string[]
  methods: string[]
  kpis: { label: string; value: string; note?: string }[]   // max 3
  hero: { src: string; alt: string } | null
  gallery: { src: string; alt: string; caption: string; confidential?: boolean }[]
  links: { label: string; href: string; type: 'demo'|'github'|'doc' }[]
  related: string[]                   // slugs
}
```

**Planned case study slots (populate later):**

| Slot | Source | Category | Priority |
|---|---|---|---|
| `stellantis-maitrise-cout-transformation` | PFE 2026 | methodes + lean | V1 — flagship |
| `aic-diagnostic-pliage-cintrage` | PFA 2025 | maintenance | V1 |
| *(to define)* academic design/dimensionnement project | CATIA/SolidWorks | conception | V1 |
| `irrigation-intelligente-iot` | Personal | digital | V1 |
| *(to define)* simulation project | ANSYS/ABAQUS | conception | V2 |
| `gestion-consommables` | Rebuilt tool | digital | V2 |
| `formation-catia-enset` | Teaching | *(render as an "Engagement" entry on Parcours, not a case study)* | V2 |
| `nexteer-optimisation-outils-cnc` | Initiation 2024 | lean | V2 — thin, keep short and honest |

---

## 7. Advanced Features — evaluated, not assumed

### 7.1 Live demo — application de gestion des consommables · **BUILD (V1.2)**
**Why:** the single highest-value feature on the site. Converts the differentiator from claim to fact.
**Critical constraint:** **do not publish the original Stellantis source code.** Code written during an internship, on company time, for company use, is company property. Rebuild it from scratch: same concept (stock de consommables, seuils d'alerte, consommation par poste, historique), your own code, generic naming, synthetic data.
**Scope:** read + write against seeded in-memory state, reset button, no auth, no database in V1.2. A visitor must be able to break nothing.
**Honesty banner:** *"Reconstruction personnelle d'un outil conçu en stage. Données fictives."*

### 7.2 Interactive dashboard — pilotage du rebut · **BUILD (V1.3)**
**Why:** proves the Power BI/data claim to a technical audience without exposing any real data.
**Scope:** Pareto of defect types, scrap rate trend by week, breakdown by shift/station, one filter. Recharts, static synthetic JSON.
**Quality bar:** the synthetic dataset must be *plausible to a manufacturing engineer* — Pareto that follows a realistic 80/20, scrap rates in a believable range, a visible improvement inflection matching the DMAIC narrative. Obviously fake data damages more than it proves.

### 7.3 3D CAD viewer · **BUILD (V2.1, conditional)**
**Why:** medium value — serves conception credibility, secondary to the Méthodes positioning.
**Conditions:** only academic models (verify IP), exported to `.glb`, Draco-compressed, target < 3 MB, lazy-loaded via dynamic import, static render fallback image, and a hard rule: **it must not degrade mobile performance.** If the model cannot meet the budget, ship the static render instead. Nobody was ever rejected for not having a 3D viewer.

### 7.4 Project filtering · **BUILD (V1)** — table stakes, URL-synced.
### 7.5 CV download · **BUILD (V1)** — tracked, FR + EN, name in filename.
### 7.6 Contact form · **BUILD (V1)** — alongside, never instead of, plain contact details.
### 7.7 Analytics · **BUILD (V1)** — Vercel Web Analytics. Tracked events: `cv_download`, `case_study_read` (scroll ≥ 75%), `demo_opened`, `contact_submitted`, `locale_switched`.
### 7.8 Dark mode · **DEFER (V2)** — the sober light identity *is* the brand; dark mode doubles design QA for zero hiring value.
### 7.9 Blog / Engineering insights · **DEFER (V3), conditionally** — high value *if* maintained, actively negative if abandoned (a blog whose last post is 8 months old signals a stalled career). Do not start until employed. Then: 4–6 substantial French posts/year on Méthodes and industrial digitalisation.
### 7.10 AI chatbot about the profile · **REJECT**
**Why rejected:** it impresses developers, not manufacturing managers. And it can hallucinate a certification, an inflated result, or an employer detail — spoken in your voice, on your own domain. An unverifiable claim on a portfolio built to prove verifiability is a self-inflicted wound. Reconsider only in V3, scoped strictly to retrieval over your own written content with an explicit "generated" label.
### 7.11 Appointment scheduling · **REJECT for now** — a fresh graduate publishing a Calendly inverts the power dynamic and reads as presumptuous in this market. Recruiters propose the slot.
### 7.12 AI-powered project search · **REJECT** — you will have 6–8 projects. Filtering solves this. Search over eight items is theatre.

---

## 8. Design Requirements

### 8.1 Direction
Industrial corporate — clean, sober, credible to a 45-year-old responsable méthodes — with detailing borrowed from **technical documentation**, not from tech-startup convention. Precision as the aesthetic. No gradients, no glassmorphism, no particle fields, no scroll-jacking, no drop shadows beyond a 1px hairline.

### 8.2 Colour tokens

```css
--paper:    #F4F5F6;  /* cool neutral ground — deliberately not cream */
--surface:  #FFFFFF;
--ink:      #14181B;  /* primary text */
--graphite: #3A4249;  /* secondary text */
--steel:    #78838C;  /* tertiary / captions */
--rule:     #DCE0E3;  /* hairlines, borders, grid */
--accent:   #0B5563;  /* deep petrol — links, primary action, active states */
--signal:   #B26B00;  /* industrial amber — data emphasis ONLY, never decoration */
```

Rationale: avoids default engineering blue (`#0066CC`), avoids Stellantis brand blue (borrowing a target employer's colour reads as naive and dates the site), avoids the cream/terracotta and near-black/acid palettes that now read as AI-generated. Petrol + graphite + amber is the palette of industrial instrumentation.

Amber is rationed: KPI figures, chart emphasis, active filter. If it appears more than twice per viewport, remove one.

### 8.3 Typography

| Role | Face | Usage |
|---|---|---|
| Display | **IBM Plex Sans Condensed**, 600 | H1–H3, section labels. Condensed width gives industrial signage character without novelty. |
| Body | **IBM Plex Sans**, 400/500 | All prose, UI. |
| Data | **IBM Plex Mono**, 400/500 | Every number, KPI, date, tool tag, figure caption, cartouche field. |

One superfamily, three voices — coherent, free, self-hosted via `next/font/local` (no Google Fonts request, better LCP, works reliably in Morocco).

**Rule:** all numeric data is monospaced. `−33,8 %` in mono next to prose in sans is the typographic tell that this is an engineer's site. Use French number formatting in FR (comma decimal, non-breaking space before `%`).

Scale (1.250): 12 / 14 / 16 / 20 / 25 / 31 / 39 / 49 px. Body 16px mobile, 17px desktop. Line-height 1.6 prose, 1.2 display. Measure capped at 68ch.

### 8.4 Layout
12-column grid, 1200px max, 24px gutters (16px mobile). 8px spacing base. Border-radius 2px maximum — near-square corners read as technical. Hairline rules (1px `--rule`) as the primary separator instead of cards-with-shadows.

### 8.5 Structural devices
Numbering (`01 / 02 / 03`) is permitted **only where sequence carries real information**: DMAIC phases, 8D steps, process routing steps, the roadmap. It is forbidden as decoration on non-sequential sections such as skills or contact. Section eyebrows use small-caps mono labels (`ÉTUDE DE CAS 02 · MÉTHODES`).

### 8.6 Signature element — **le cartouche**
Every case study opens with a title block modelled on the *cartouche* of a technical drawing: a bordered, hairline-ruled grid of labelled fields in mono type — `PROJET · ORGANISATION · PÉRIODE · RÔLE · MÉTHODES · INDICE DE CONFIDENTIALITÉ`. It is drawn from the actual vernacular of mechanical engineering documentation, it is functional (it is the fastest possible scan for persona 1), and no other portfolio in the applicant pool will have one. This is the site's one memorable element — everything around it stays quiet.

### 8.7 Motion
One orchestrated page-load reveal on the homepage hero (staggered opacity + 8px translate, 400ms, ease-out). Hover states are instant colour shifts, not transforms. No scroll-triggered animation beyond a single fade on case study figures. `prefers-reduced-motion: reduce` disables all of it.

### 8.8 Responsive
Mobile-first, breakpoints 390 / 768 / 1024 / 1280. **Every page must be validated on a real mid-range Android over a throttled connection**, not just in DevTools. Persona 2 is on a phone.

### 8.9 Accessibility
WCAG 2.1 AA. Contrast ≥ 4.5:1 for text (verify `--steel` on `--paper` — use only at 14px+ and 500 weight). Visible focus rings (2px `--accent`, 2px offset). Full keyboard navigation. Semantic landmarks. `lang` attribute switching per locale. Alt text authored in both locales — never auto-generated. Charts carry an accessible data table fallback.

### 8.10 Copy rules
Sentence case everywhere, including buttons. Actions name their outcome: `Télécharger le CV`, not `Cliquez ici`. Empty and error states give direction, not apology: *"Aucun projet dans cette catégorie. Voir tous les projets →"*.

---

## 9. Technical Architecture

### 9.1 Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15, App Router, TypeScript (strict)** | Static generation gives sub-second loads on Moroccan mobile networks; first-class Vercel deployment; the best-supported target for Claude Code; server components keep the JS bundle small. |
| Styling | **Tailwind CSS v4** with design tokens declared as CSS variables in `@theme` | Tokens from 8.2/8.3 are enforced centrally, which is what stops an AI-assisted build from drifting into generic styling. |
| i18n | **next-intl**, locale-prefixed routing (`/fr`, `/en`), `fr` default | Retrofitting i18n is painful; this is decided at scaffold time. Generates correct `hreflang`. |
| Content | **MDX files in-repo**, frontmatter validated with **Zod** at build time | Git is the CMS. Zero cost, zero vendor, versioned, and a build fails loudly if a case study is malformed — which is what you want when adding content in a hurry. No CMS in V1. |
| Charts | **Recharts** | Lightweight, declarative, adequate for a Pareto and two trend charts. |
| 3D | **@react-three/fiber + @react-three/drei**, dynamic import only | Never in the initial bundle. |
| Email | **Resend** + Next.js Server Action + Zod + honeypot + IP rate limit | Free tier is sufficient; no backend to maintain. |
| Analytics | **Vercel Web Analytics** (+ Speed Insights) | Privacy-friendly, cookieless, no consent banner needed, zero config. |
| Hosting | **Vercel**, GitHub-connected | Preview deployment per branch — test on your phone before merging to `main`. |
| Database | **None in V1.** Neon Postgres + Drizzle only if the consommables demo later needs persistence. | Every service added is a service that can break in front of a recruiter. |
| Auth | **None.** | Nothing on this site is private. |

### 9.2 Repository structure

```
/app
  /[locale]
    layout.tsx  page.tsx
    /parcours   /competences
    /projets    /projets/[slug]
    /demos/consommables   /demos/pilotage
    /contact    /mentions-legales
  /api/contact/route.ts
  sitemap.ts  robots.ts  opengraph-image.tsx
/components
  /layout    Header Footer LocaleSwitcher CvButton
  /case      Cartouche KpiRow FigureBlock MethodSteps ToolChips ConfidentialNotice
  /home      Hero ProofBar FeaturedProjects CompetenceBlocks MiniTimeline
  /demos     ConsommablesApp ParetoChart ScrapTrendChart ModelViewer
  /ui        Button Tag Section Rule Prose
/content
  /fr/projets/*.mdx    /en/projets/*.mdx
  /fr/parcours.mdx     /en/parcours.mdx
/lib        schema.ts (zod) content.ts analytics.ts
/messages   fr.json  en.json
/public     /cv  /images  /models
```

### 9.3 Performance budget (enforced, not aspirational)

- Lighthouse mobile ≥ 95 on Performance, Accessibility, Best Practices, SEO
- LCP < 2.0 s on simulated 4G; CLS < 0.05; INP < 200 ms
- Initial JS < 150 KB gzipped on the homepage
- All images `next/image`, AVIF/WebP, explicit dimensions
- Fonts self-hosted, `font-display: swap`, subset to latin + latin-ext

### 9.4 SEO
Per-locale metadata; `hreflang` alternates; `sitemap.ts` covering both locales; JSON-LD `Person` schema (name, jobTitle, alumniOf ENSET-M, knowsAbout, address Kénitra, sameAs LinkedIn); per-case-study OG images generated with `next/og`. Target queries: *"ingénieur méthodes Maroc"*, *"ingénieur industrialisation Kénitra"*, *"ingénieur lean manufacturing Maroc"*, and your own name.

### 9.5 Claude Code build sequence
Build in this order, committing and deploying after each step. Do not attempt the whole site in one prompt.

1. Scaffold + tokens + fonts + layout shell + i18n routing
2. Header/Footer/LocaleSwitcher + CV action
3. Content schema (Zod) + MDX pipeline + one seeded case study
4. Case study template + **Cartouche** component
5. Projets index + filtering
6. Homepage
7. Parcours + Compétences
8. Contact + API route
9. SEO, analytics, OG images
10. Demos (separately, per 11.2)

---

## 10. Content Strategy — what you must prepare

Content is the bottleneck, not code. Estimated effort: 18–25 hours.

| # | Asset | Notes | Effort |
|---|---|---|---|
| 10.1 | Professional biography (FR, 150–200 words) | First person. Structure: who you are → what you've proven → what you're looking for → what makes you different. No adjectives without evidence. | 2 h |
| 10.2 | **Retrieve the PFE report** | Your richest source: problem framing, SIPOC, Ishikawa logic, action plan, conclusions. Get it from your drafts, your encadrant, or the ENSET library. **Do this first.** | 1 h |
| 10.3 | **Verify the confidentiality clause** | Convention de stage Stellantis + PFE confidentiality status. Blocks publication of case study 1. | 1 h |
| 10.4 | 4 case studies written in FR to the section 6 skeleton | ~700–900 words each | 8 h |
| 10.5 | EN translation, reviewed line by line | Watch: gamme → routing/process sheet · rebut → scrap · poste → workstation · étanchéité → sealing/leak-tightness · encollage → adhesive application · rebut retouché → reworked part. Never ship unreviewed machine translation. | 4 h |
| 10.6 | Figures: redrawn layout, anonymised Pareto/Ishikawa, CAD renders, simulation images | Redraw industrial figures cleanly rather than screenshotting internal documents | 4 h |
| 10.7 | Certifications | **Currently a gap.** Green Belt (or at minimum a documented Yellow Belt), a CATIA certificate, or a Power BI certificate would materially strengthen the Méthodes claim. Treat as a parallel career action, not a website task. | — |
| 10.8 | Professional photograph | Current, neutral background, professional dress. The CV headshot works if recent. | 1 h |
| 10.9 | CV PDF, FR and EN | Add the portfolio URL to the CV header — this is how traffic arrives | 1 h |
| 10.10 | Synthetic dataset for the dashboard | Must be plausible to a manufacturing engineer | 2 h |

**Known content gap to address deliberately:** no chronométrage / temps de cycle / équilibrage de ligne experience. A Méthodes interviewer will ask. Options: (a) if you did any informal timing at Stellantis, document it in the case study; (b) include a small self-directed study — a chronométrage and équilibrage exercise on a documented process — as a short case study; (c) address it honestly in interview and lean on layout + standards as your Méthodes evidence. Option (b) is the strongest and costs about a weekend.

---

## 11. MVP Definition

### 11.1 Must have — V1.0 (launch, weeks 1–3)
Homepage · Parcours · Compétences · Projets index with filtering · **3 case studies** (Stellantis, AIC, one other) · CV download FR/EN · Contact form + direct details · FR/EN complete · mobile-validated · analytics · SEO/OG · mentions légales.

**Launch gate:** the site goes live once these exist. Nothing below blocks it.

### 11.2 Should have — V1.1–1.3 (weeks 4–7)
4th–5th case studies · consommables demo (V1.2) · dashboard demo (V1.3) · per-case OG images · LinkedIn featured-section assets.

Each demo ships behind a feature flag and is revealed only when complete and mobile-tested. **A recruiter must never encounter an empty dashboard or a spinning loader** — an absent feature is invisible, a broken one is disqualifying.

### 11.3 Nice to have — V2 (months 2–4)
3D CAD viewer (conditional on the performance budget) · dark mode · remaining case studies · chronométrage study · print stylesheet for case studies.

### 11.4 Future — V3 (post-employment)
Blog · Green Belt certification page · scoped RAG assistant over your own content, explicitly labelled · English-market repositioning if you target abroad.

---

## 12. Success Metrics

The honest primary metric is qualitative and lagging, so it is listed first and not hidden behind vanity numbers.

| Tier | Metric | Target (6 months) | Source |
|---|---|---|---|
| **Primary** | Interviews where the interviewer references the portfolio unprompted | ≥ 3 | Your own log — keep one |
| **Primary** | Interview invitations following applications carrying the link | +30% vs. CV-only baseline | Application tracker |
| Secondary | CV downloads from the site | ≥ 40 | `cv_download` event |
| Secondary | Case-study read-through (scroll ≥ 75%) | ≥ 25% of project-page visits | `case_study_read` |
| Secondary | Median session duration | ≥ 90 s | Vercel Analytics |
| Secondary | Demo opened | ≥ 15% of case-study readers | `demo_opened` |
| Secondary | LinkedIn profile views | +50% after publishing the launch post | LinkedIn |
| Health | Lighthouse mobile Performance | ≥ 95 sustained | Vercel Speed Insights |
| Health | Name search ranks #1 | within 8 weeks | Google |

**Review cadence:** every two weeks for the first two months. If interviews are not referencing the site by month 2, the problem is distribution (CV header, LinkedIn, email signature, application messages), not design.

---

## 13. Development Roadmap

| Phase | Window | Work | Exit criterion |
|---|---|---|---|
| **0 — Unblock** | Days 1–3 | Verify confidentiality clause · retrieve PFE report · buy domain · create GitHub repo · connect Vercel | Legal position known; repo deploying a placeholder |
| **1 — Content core** | Days 3–10 | Write biography + 3 case studies in FR · gather and redraw figures · assemble FR/EN CV PDFs | 3 case studies complete in Markdown, offline |
| **2 — Build** | Days 8–16 *(overlaps phase 1)* | Claude Code sequence 9.5 steps 1–9 | All V1 pages rendering with real content, FR complete |
| **3 — Bilingual** | Days 14–18 | EN translation, reviewed line by line · hreflang · locale QA | EN parity; no untranslated strings |
| **4 — Test** | Days 16–20 | Real mid-range Android on 4G · Lighthouse · keyboard + screen reader pass · contact form end-to-end · link audit · proofread by a francophone third party | All budgets in 9.3 met; zero typos |
| **5 — Launch** | Day 21 | Custom domain live · sitemap submitted to Search Console · URL added to CV header, LinkedIn profile, email signature · LinkedIn launch post | Site public and distributed |
| **6 — Enrich** | Weeks 4–7 | Consommables demo · dashboard demo · case studies 4–5 | V1.3 complete |
| **7 — Iterate** | Ongoing | Bi-weekly metric review · chronométrage study · 3D viewer if budget allows | Metrics in section 12 trending to target |

**Critical path:** confidentiality verification → case study 1 → launch. Everything else can slip.

---

## Appendix A — Decisions locked in discovery

| Decision | Choice | Rationale |
|---|---|---|
| Goal | First engineering job, Morocco, automotive/industrial | — |
| Positioning | Méthodes & Industrialisation primary; Lean secondary | Stated ambition, supported by real deliverables (layout + gamme) |
| Portfolio role | Credibility multiplier for LinkedIn and interviews | Moroccan industrial hiring runs on ATS, referrals, cabinets — not portfolio discovery |
| Confidentiality | Assume confidential; anonymise by default | Signalled status unknown; downside of a breach is severe |
| Stellantis app code | Rebuild, never republish | Internship output is company IP |
| Languages | FR/EN from launch, FR as source of truth | Market is francophone; EN signals mobility |
| Visual direction | Industrial corporate + technical-documentation detailing | Credibility with persona 1 |
| Signature | The cartouche title block | Drawn from the subject's own vernacular; functional, not decorative |
| Advanced features | All three demos, staged, non-blocking | Approved with the constraint that nothing delays launch |
| AI chatbot | Rejected | Hallucination risk on a site whose purpose is verifiability |
| Build method | Claude Code → GitHub → Vercel | — |

## Appendix B — Open items requiring your input

1. Full project inventory (deferred) — populate the slots in section 6.
2. Origin of each CAD model: academic (publishable) vs. company (not publishable).
3. Domain availability confirmation.
4. Whether any chronométrage work exists that you discounted.
5. Certification plan (section 10.7).
