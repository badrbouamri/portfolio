# Brief de refonte visuelle — portfolio Badr Eddine ELBOUAMRI

> À placer à la racine du dépôt. Dans Claude Code : joins la capture d'écran de référence
> (portfolio "Simon Sparks", Dribbble) et écris : « Lis BRIEF-REFONTE-PORTFOLIO.md,
> commence par la Phase 0 et arrête-toi au premier point de contrôle. »

---

## 0. Ce qu'on fait, ce qu'on ne fait pas

Refonte **visuelle et animée** d'un portfolio Next.js existant et en ligne
(https://badreddineelbouamri.vercel.app, routes `/fr` et `/en`). Le contenu est écrit,
validé, et ne bouge pas. On refait la peau, la typographie, la mise en page et le mouvement.

**Contraintes dures — à ne jamais franchir sans me demander :**

- Aucun texte de contenu modifié, réécrit ou traduit. Seuls les libellés d'interface
  peuvent apparaître, et ils doivent exister en FR **et** EN dans les fichiers de traduction.
- Aucune route modifiée ou supprimée : `/`, `/parcours`, `/competences`, `/projets`,
  `/projets/[slug]`, `/contact`, `/cv`, `/mentions-legales`, en `/fr` et `/en`.
- Les sources de données (projets, parcours, compétences) restent où elles sont.
  Si le rendu a besoin d'un champ supplémentaire (image, chiffre clé), tu me le signales,
  tu ne l'inventes pas.
- Hiérarchie sémantique conservée : un seul `h1` par page, ordre `h2`/`h3` inchangé,
  `alt` d'images conservés ou améliorés, metadata intactes.
- Pas de nouvelle dépendance sans validation. **Autorisé d'office :** `framer-motion`.
  **Refusé :** librairies de composants (MUI, Chakra, shadcn complet), GSAP, Lenis,
  Three.js, Locomotive Scroll, toute librairie de curseur ou de particules.
- Zéro régression : `npm run build` doit passer, TypeScript strict sans `any` ajouté.

---

## 1. Positionnement — lis ça avant de coder

La référence est le site d'un artiste 3D. Je suis **ingénieur méthodes & industrialisation**
(Stellantis, AIC Métallurgie, Nexteer, ENSET Mohammedia). Mes lecteurs sont des responsables
méthodes, des RH industrielles et des directeurs de production au Maroc.

On garde de la référence : la **nuit bleue profonde**, la **typographie sérif éditoriale**,
les **filets d'un pixel**, l'**accent doré**, les **cadres décalés**, le calme et l'espace.

On jette : les blobs 3D génératifs, le vocabulaire artistique, la décoration gratuite.
À la place, l'imagerie est **technique et réelle** : rendus CATIA V5, captures de tableau
de bord Power BI, photos d'atelier, schémas de ligne, tracés de courbes de niveau utilisés
comme texture de fond.

Deux règles de discipline, à appliquer partout :

1. **La numérotation n'est utilisée que là où il y a vraiment une séquence** : le parcours
   chronologique, les cinq phases DMAIC de l'étude Stellantis. Pas de `01/02/03` décoratif
   sur des cartes de projet qui n'ont pas d'ordre.
2. **Un seul grand moment de mouvement par page** (l'entrée du hero en accueil). Le reste
   du mouvement répond à une action de l'utilisateur ou reste sous le seuil de perception.
   Une page où chaque section monte en fondu au scroll est le réglage par défaut de tout le
   monde ; on ne le fait pas.

---

## 2. Système de design

### 2.1 Couleurs

Palette de six valeurs. Rien d'autre n'entre dans le projet sans validation.

| Token | Hex | Usage |
|---|---|---|
| `--ink-900` | `#050A1C` | fond de page, base de tout |
| `--ink-700` | `#0A1533` | dégradé haut de page, halo, fonds de section alternés |
| `--ink-500` | `#0D1836` | surfaces de cartes |
| `--ink-400` | `#122048` | survol de surface |
| `--paper` | `#EAF0FF` | texte principal, titres |
| `--paper-dim` | `#8FA3C8` | texte courant, légendes (ne jamais descendre plus sombre) |
| `--brass` | `#E4C07A` | accent unique : filets actifs, liens, bordures de bouton, valeurs clés |
| `--signal` | `#3E7BFF` | halo lumineux et focus clavier uniquement, jamais du texte |

Bordures : `rgba(234, 240, 255, 0.08)`, toujours **1px**, jamais plus.
Bordure active/survol : `rgba(228, 192, 122, 0.45)`.

```css
/* app/globals.css */
:root {
  --ink-900:#050A1C; --ink-700:#0A1533; --ink-500:#0D1836; --ink-400:#122048;
  --paper:#EAF0FF; --paper-dim:#8FA3C8; --brass:#E4C07A; --signal:#3E7BFF;
  --line: rgba(234,240,255,.08);
  --line-active: rgba(228,192,122,.45);
  --ease-out: cubic-bezier(.33,1,.68,1);
  --ease-soft: cubic-bezier(.16,1,.3,1);
}
```

Expose les mêmes valeurs dans `tailwind.config.ts` via `theme.extend.colors` en pointant sur
les variables CSS (`ink: { 900: 'var(--ink-900)' }`, etc.), pour que les classes utilitaires
et le CSS custom restent synchronisés.

### 2.2 Typographie

Trois rôles, trois familles, chargées avec `next/font/google` (`display: 'swap'`,
`subsets: ['latin']`, variables CSS).

- **Display — `Bodoni Moda`**, poids 400/500. Contraste fort, exactement la personnalité de
  la référence. Uniquement les titres. `letter-spacing: -0.015em`.
- **Interface & corps — `Inter Tight`**, poids 400/500. Tout le texte courant, la navigation,
  les boutons.
- **Données — `IBM Plex Mono`**, poids 400/500. Uniquement les valeurs mesurées : `−33,8 %`,
  les dates (`2026-02 → 2026-07`), les numéros de station (`ST40`, `L2`), les compteurs.
  Ce choix est motivé : ce sont des données d'atelier, elles doivent se lire comme telles.
  `font-variant-numeric: tabular-nums`.

Échelle (desktop / mobile) :

| Rôle | Taille | Interlignage | Détail |
|---|---|---|---|
| Hero `h1` | 76px / 40px | 1.02 | Display 400 |
| Titre de section `h2` | 44px / 30px | 1.1 | Display 400 |
| Titre de carte `h3` | 22px / 19px | 1.25 | Inter Tight 500 |
| Corps | 17px / 16px | 1.7 | Inter Tight 400, `--paper-dim`, max **68ch** |
| Chapeau/intro | 20px / 18px | 1.6 | Inter Tight 400, `--paper` |
| Filet de section | 11px | 1 | Inter Tight 500, `letter-spacing: .22em`, capitales, `--brass` |
| Donnée clé | 56px / 36px | 1 | Plex Mono 400, `--brass` |
| Légende | 13px | 1.5 | Inter Tight 400, `--paper-dim` |

Les capitales trackées sont **réservées** aux filets de section et aux boutons. Elles ne
doivent apparaître nulle part ailleurs, sinon la page prend l'air d'un gabarit.

### 2.3 Grille et rythme

- Conteneur : `max-width: 1240px`, marges `20px` mobile / `56px` desktop.
- Grille de 12 colonnes, gouttière 24px. Les blocs éditoriaux occupent 6 à 8 colonnes,
  jamais 12 : la colonne de texte doit rester étroite.
- Rythme vertical : `96px` mobile / `168px` desktop entre sections. Défini **une seule fois**
  dans une classe `.section` ; interdiction de remettre du padding vertical dans les
  composants enfants (c'est la source classique de spécificité qui se contredit).
- Rayons : `2px` maximum. Aspect découpé, pas arrondi.
- Ombres : aucune ombre grise portée. La profondeur vient d'un halo :
  `box-shadow: 0 0 80px -20px rgba(62,123,255,.35)`.

### 2.4 Couches de fond

Trois couches empilées dans un composant `<Backdrop />` monté une fois dans le layout,
en `position: fixed; inset: 0; z-index: -1; pointer-events: none`.

1. **Base** : `--ink-900` uni.
2. **Halo** : dégradé radial centré à `50% -10%`, de `rgba(62,123,255,.18)` vers
   transparent sur 60% de la largeur. C'est lui qui donne la nuit « éclairée par le haut ».
3. **Grain** : `<svg>` `feTurbulence baseFrequency="0.8" numOctaves="3"` en overlay,
   `opacity: .035`, `mix-blend-mode: overlay`. Généré en SVG inline encodé en data-URI,
   pas de fichier image.

Texture optionnelle de **courbes de niveau** (SVG de lignes topographiques, `opacity: .04`)
dans les deux sections les plus vides — clin d'œil au dessin technique, à ne pas répéter
partout.

---

## 3. Bibliothèque de composants

À créer dans `components/ui/`, chacun typé, sans logique métier, testé visuellement isolément.

### `<SectionLabel />`
Filet de section. Chevron `▸` de 6px en `--brass`, texte capitales trackées.
Props : `children`, `as` (défaut `p`).

### `<Button />`
Variantes `ghost` (défaut) et `solid`.
- `ghost` : fond transparent, bordure 1px `--brass`, texte `--paper` capitales trackées 11px,
  padding `14px 26px`. Au survol : un fond `--brass` se remplit **depuis la gauche**
  (pseudo-élément avec `transform: scaleX()` et `transform-origin: left`, 320ms `--ease-out`),
  le texte passe en `--ink-900`. La flèche glisse de 4px à droite.
- `solid` : fond `--brass`, texte `--ink-900`, mêmes dimensions.
- États : `:focus-visible` → contour 2px `--signal`, offset 3px. `:active` → `scale(.98)`.
- Rend un `<a>` si `href`, sinon `<button>`. Jamais de `div` cliquable.

### `<Card />`
Surface `--ink-500`, bordure 1px `--line`, rayon 2px, padding 28px.
Au survol (desktop, `@media (hover: hover)`) : `translateY(-4px)`, bordure `--line-active`,
halo `--signal` qui apparaît en opacité, 240ms `--ease-out`. Pas d'effet au tap mobile.
Variantes : `default`, `feature` (plus haute, image en haut), `flat` (sans survol).

### `<FramedImage />`
Image `next/image` avec un cadre 1px décalé de 12px en bas à droite (pseudo-élément).
Props : `src`, `alt`, `caption`, `priority`, `ratio`.
La légende s'affiche en dessous, 13px `--paper-dim`, alignée à gauche.

### `<Stat />`
Donnée mesurée. Valeur en Plex Mono `--brass`, libellé en dessous en 11px trackés.
Props : `value` (nombre), `suffix`, `label`, `animate` (défaut `true` — voir §5.6).

### `<Divider />`
Filet horizontal 1px `--line` sur toute la largeur du conteneur, avec un segment de 40px
en `--brass` à gauche. Sert de séparateur de section.

### `<Header />`
Monogramme `BE` au centre. À gauche : Accueil, Parcours, Compétences. À droite : Projets,
Contact. Sélecteur FR/EN et bouton CV à l'extrême droite.
- Position `sticky top-0`, fond transparent en haut de page.
- Au-delà de 40px de scroll : `background: rgba(5,10,28,.72)`, `backdrop-filter: blur(12px)`,
  bordure basse 1px `--line`. Transition 300ms.
- Lien actif : `--brass` + filet de 1px sous le lien.
- Mobile (<1024px) : bouton hamburger, tiroir plein écran, fermeture à `Échap`, focus
  piégé dans le tiroir, `body` verrouillé pendant l'ouverture.

### `<Footer />`
Monogramme encadré au centre, liens en Display séparés par des barres obliques, icônes
LinkedIn et e-mail à gauche, ligne de copyright en 10px trackés `--paper-dim`.

### `<LogoRail />`
Bandeau des organismes (Stellantis, AIC Métallurgie, Nexteer, ENSET). Logos en blanc
désaturé (`filter: grayscale(1) brightness(2)`), `opacity: .45`, pleine opacité au survol,
séparés par des filets verticaux 1px de 24px de haut.

---

## 4. Plan des pages

### 4.1 Accueil

**Bloc 1 — Hero, pleine hauteur (`min-height: 92svh`).**
Composition centrée. De haut en bas :
`INGÉNIERIE INDUSTRIELLE` (filet doré) → `Badr Eddine ELBOUAMRI` (Display 76px, sur deux
lignes, le prénom au-dessus du nom) → filet horizontal de 1px de 120px →
`Méthodes & Industrialisation · Lean Manufacturing · Industrie 4.0` en 13px `--paper-dim`.
Derrière le titre : `images/cover.jpg` en couche de fond, masquée par un dégradé radial
(`mask-image`), opacité 0.35, plus le halo `--signal`.
En bas : indicateur de scroll — un filet vertical de 48px où un segment de 12px descend
en boucle (animation CSS 2s, `--ease-soft`).
Repères discrets sur les bords : `01` à gauche et un chevron à droite, 10px `--paper-dim`
à 30% d'opacité. Décoratifs → `aria-hidden`.

**Bloc 2 — LogoRail.** Titre en 11px trackés : « Organismes d'accueil & formation ».

**Bloc 3 — Note de positionnement.** Colonne de 7 sur 12, alignée à gauche, décalée de 2
colonnes. Le paragraphe « Je suis ingénieur d'État… » en 20px, suivi de la disponibilité
(Kénitra – Rabat – Casablanca – Tanger) sur une ligne en Plex Mono 13px `--brass`.

**Bloc 4 — Projets en vedette.** Trois cartes en grille asymétrique : la carte Stellantis
occupe 6 colonnes et porte une image (capture Power BI ou photo de ligne) ; les deux autres
(IoT, CATIA V5) occupent 3 colonnes chacune, sans image, avec la catégorie en filet doré,
le titre en `h3`, deux lignes de description, les tags techniques en 11px, et le lien
« Voir l'étude de cas ». Ordre libre → **pas de numérotation**.

**Bloc 5 — Étude de cas Stellantis, pleine largeur.**
`<FramedImage />` large en haut, puis en dessous, sur deux colonnes : à gauche le filet
`ÉTUDE DE CAS` et le titre Display « Maîtrise du coût de transformation » ; à droite le
paragraphe et le bouton « Lire l'étude ».
Sous le bloc, une bande de trois `<Stat />` : `−33,8 %` / coût de rebut ligne L2,
`ST40` / poste de retouche standardisé, `DMAIC` / démarche appliquée.

**Bloc 6 — Compétences.** Quatre entrées (Méthodes & Industrialisation, Amélioration
continue & qualité, Maintenance & fiabilité, Données & développement). Chacune : un `h3`,
la preuve chiffrée associée en corps de texte, et un lien vers le projet. Disposition en
liste, pas en cartes : chaque entrée occupe une ligne pleine largeur séparée par un
`<Divider />`. Au survol de la ligne, le filet gauche passe en `--brass` sur toute sa
largeur (`scaleX` depuis la gauche).

**Bloc 7 — Parcours (aperçu).** Timeline verticale, trois entrées, **numérotées** parce que
c'est une séquence. Filet vertical 1px `--line` à gauche, pastilles de 7px `--brass`.
Date en Plex Mono, intitulé en `h3`, entreprise en `--paper-dim`.

**Bloc 8 — Contact.** Fond légèrement plus clair (`--ink-700`). Filet `DISPONIBILITÉ`,
titre Display « Un poste en méthodes à pourvoir ? », coordonnées en trois colonnes
(localisation, mobilité, e-mail), bouton « Écrire un message ».

**Bloc 9 — Footer.**

### 4.2 Pages internes

- **`/projets`** : grille de cartes uniforme (3 colonnes desktop, 1 mobile), filtre par
  catégorie en filets cliquables si le filtre existe déjà — sinon ne l'invente pas.
- **`/projets/[slug]`** : hero de page = filet catégorie + `h1` Display + méta en Plex Mono
  (période, entreprise, rôle) + `<FramedImage />` pleine largeur. Corps de texte en colonne
  de 68ch centrée. Les phases DMAIC, si le contenu les liste, sont numérotées 01→05.
  Bande de `<Stat />` en fin d'article, puis navigation vers le projet suivant.
- **`/parcours`** : la timeline du bloc 7, complète, avec les descriptions longues.
- **`/competences`** : quatre sections, chacune introduite par un `h2` Display et une liste
  de compétences en deux colonnes, chaque item lié à sa preuve.
- **`/contact`** : formulaire s'il existe (champs stylés : fond transparent, filet bas 1px
  qui passe en `--brass` au focus, label flottant) + coordonnées + carte statique optionnelle.
- **`/cv`** : page de téléchargement sobre, un `<Button solid>` unique.
- **`/mentions-legales`** : gabarit texte simple, colonne 68ch.

---

## 5. Système de mouvement

C'est la partie qui fait la différence entre « joli » et « vivant ». Trois principes :
**le mouvement explique**, il ne décore pas ; **une seule orchestration** par page ;
tout est en `transform` et `opacity`, rien d'autre.

### 5.1 Courbes et durées

```ts
// lib/motion.ts
export const ease = {
  out:  [0.33, 1, 0.68, 1],   // interactions, survols
  soft: [0.16, 1, 0.30, 1],   // entrées, révélations
  in:   [0.55, 0, 1, 0.45],   // sorties
} as const;

export const duration = {
  micro: 0.18,   // changement d'état instantané (couleur, opacité)
  fast:  0.24,   // survol de carte, bouton
  base:  0.42,   // transition de page, ouverture de tiroir
  slow:  0.80,   // révélation d'un bloc
  hero:  1.10,   // segments de l'orchestration d'accueil
} as const;
```

### 5.2 Orchestration d'entrée du hero — le seul grand moment

Se joue une fois, au chargement de l'accueil. Total ≈ 2,0 s. Aucun `layout shift` :
tout est en place, seules l'opacité et la position changent.

| t (ms) | Élément | Mouvement |
|---|---|---|
| 0 | Fond `cover.jpg` | `opacity 0 → .35`, `scale 1.06 → 1`, 1400ms `soft` |
| 120 | Halo `--signal` | `opacity 0 → 1`, 1200ms `soft` |
| 260 | Filet `INGÉNIERIE INDUSTRIELLE` | `opacity 0 → 1`, `y 12 → 0`, 700ms `soft` |
| 380 | `h1` ligne 1 (« Badr Eddine ») | révélation par masque, `y 100% → 0`, 900ms `soft` |
| 460 | `h1` ligne 2 (« ELBOUAMRI ») | idem, décalage de 80ms |
| 700 | Filet horizontal | `scaleX 0 → 1`, origine gauche, 800ms `soft` |
| 860 | Sous-titre | `opacity 0 → 1`, `y 10 → 0`, 700ms `soft` |
| 1100 | Header (liens + monogramme) | `opacity 0 → 1`, 600ms, décalage 40ms par lien |
| 1500 | Indicateur de scroll | `opacity 0 → 1` puis boucle infinie |

Révélation par masque à écrire ainsi (pas de `clip-path` animé, trop coûteux) :

```tsx
<span className="block overflow-hidden">
  <motion.span
    className="block"
    initial={{ y: '100%' }}
    animate={{ y: 0 }}
    transition={{ duration: 0.9, ease: ease.soft, delay: 0.38 }}
  >
    Badr Eddine
  </motion.span>
</span>
```

### 5.3 Révélations au scroll — sobres et rares

Seuls **cinq** éléments de l'accueil se révèlent au scroll : le titre du bloc projets,
l'image de l'étude de cas, la bande de `<Stat />`, la timeline, le bloc contact.
Les paragraphes et les cartes sont visibles d'emblée.

```tsx
// components/Reveal.tsx
const variants = {
  hidden: { opacity: 0, y: 18 },
  shown:  { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.soft } },
};
// useInView(ref, { once: true, margin: '-12% 0px -12% 0px' })
```

Décalage entre enfants d'un même groupe : `staggerChildren: 0.07`, maximum 5 enfants.
Au-delà, le groupe entre d'un bloc.

### 5.4 Parallaxe

Uniquement sur trois éléments, amplitude faible, désactivée sous 1024px :
- fond du hero : `y` de `0` à `+60px` sur la traversée de la section ;
- `<FramedImage />` de l'étude de cas : `y` de `-24px` à `+24px` ;
- textures de courbes de niveau : `y` de `0` à `-40px`.

```ts
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);
```

Interdiction d'animer `background-position`, `filter`, `box-shadow` ou `height` au scroll.

### 5.5 Micro-interactions (déclenchées par l'utilisateur)

| Élément | Déclencheur | Effet | Durée |
|---|---|---|---|
| Bouton fantôme | survol | remplissage `scaleX` depuis la gauche + flèche +4px | 320ms `out` |
| Carte | survol | `translateY(-4px)`, bordure `--line-active`, halo `opacity 0→1` | 240ms `out` |
| Ligne de compétence | survol | filet gauche `scaleX 0→1`, titre `--paper`→`--brass` | 260ms `out` |
| Lien de nav | survol | filet bas `scaleX 0→1` depuis la gauche | 200ms `out` |
| Logo du bandeau | survol | `opacity .45→1`, `grayscale 1→0` | 300ms `out` |
| Image de projet | survol | `scale 1→1.03` à l'intérieur d'un conteneur `overflow:hidden` | 500ms `soft` |
| Champ de formulaire | focus | filet bas `--line`→`--brass`, label monte de 18px | 200ms `out` |
| Tout élément focusable | `:focus-visible` | contour 2px `--signal`, offset 3px | instantané |

Sur mobile, tous les effets de survol sont neutralisés via `@media (hover: hover)` :
un état de survol collé après un tap est un bug, pas un effet.

### 5.6 Compteurs de données

Les `<Stat />` comptent de 0 à leur valeur quand ils entrent dans le champ (une seule fois),
sur 1200ms en `soft`, en Plex Mono avec `tabular-nums` pour éviter tout tremblement de
largeur. Le signe et le suffixe (`−`, `%`) sont affichés dès le départ, seul le nombre défile.
Si `prefers-reduced-motion` : la valeur finale s'affiche directement.

```tsx
const mv = useMotionValue(0);
const rounded = useTransform(mv, v => v.toFixed(1).replace('.', ','));
useEffect(() => { if (inView) animate(mv, 33.8, { duration: 1.2, ease: ease.soft }); }, [inView]);
```

### 5.7 Bandeau de logos

Défilement horizontal continu en CSS pur : la liste est dupliquée, le conteneur translate de
`-50%` en 42s linéaire, en boucle. Pause au survol. Le duplicata porte `aria-hidden="true"`.
Désactivé (liste statique centrée) sous 768px et en `prefers-reduced-motion`.

### 5.8 Transitions de page

Fondu court entre routes : sortie `opacity 1→0` en 200ms, entrée `opacity 0→1` +
`y 8→0` en 420ms `soft`. Pas de rideau plein écran, pas de logo de chargement — sur un
portfolio consulté par un recruteur pressé, chaque milliseconde d'attente artificielle est
une perte. Le scroll remonte en haut à chaque navigation.

### 5.9 Indicateur de progression

Un filet de 1px en `--brass` en haut de la fenêtre, largeur liée à `scrollYProgress`,
`transform-origin: left`, `scaleX` piloté par `useSpring({ stiffness: 120, damping: 30 })`.
Visible uniquement sur `/projets/[slug]` (articles longs), pas sur l'accueil.

### 5.10 Mouvement réduit

Un seul point d'entrée, respecté partout :

```ts
const reduce = useReducedMotion();
```

- Révélations → contenu visible immédiatement, aucune transformation.
- Orchestration du hero → tout est en place, un simple fondu global de 200ms.
- Parallaxe, compteurs, marquee → désactivés, valeurs finales affichées.
- Micro-interactions → conservées mais réduites aux changements de couleur.

### 5.11 Règles de performance du mouvement

- `transform` et `opacity` exclusivement. Aucune animation de propriété qui déclenche un
  recalcul de mise en page.
- `will-change: transform` uniquement sur les éléments réellement en mouvement, retiré après.
- Tous les `useInView` en `once: true` ; aucun observateur laissé actif après déclenchement.
- Aucune animation sur des éléments hors écran ; le marquee se met en pause via
  `IntersectionObserver` quand il sort du champ.
- Objectif : 60 fps constants au scroll sur un mobile milieu de gamme. Vérifie avec le
  panneau Performance de Chrome DevTools, ralenti CPU ×4.

---

## 6. Responsive

Points de rupture : `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.

- Conception mobile d'abord. Le hero doit rester impeccable en 375px de large : `h1` à 40px,
  jamais de coupure de mot, `min-height: 92svh` (pas `vh`, à cause de la barre d'URL iOS).
- Sous 1024px : parallaxe coupée, grilles asymétriques repliées en une colonne, marquee figé.
- Zones tactiles : 44×44px minimum, y compris le sélecteur de langue et les icônes sociales.
- Tester en 320px (petit Android), 375px (iPhone SE), 768px (iPad portrait), 1440px, 1920px.

---

## 7. Accessibilité — non négociable

- Contraste : `--paper-dim` sur `--ink-900` donne ≈ 7,4:1, correct. Ne jamais assombrir ce
  gris. `--brass` sur `--ink-900` ≈ 9:1. Vérifier chaque nouveau couple.
- Focus visible sur tout élément interactif, jamais `outline: none` sans remplacement.
- Lien d'évitement « Aller au contenu » en début de `body`, visible au focus.
- Tiroir mobile : `role="dialog"`, `aria-modal`, focus piégé, retour du focus au bouton
  d'ouverture à la fermeture, fermeture à `Échap`.
- Éléments décoratifs (repères `01`, chevrons, duplicata du marquee) en `aria-hidden="true"`.
- Images : `alt` descriptif, `alt=""` pour le purement décoratif.
- Navigation complète au clavier, dans un ordre logique, testée sans souris.
- `lang` correct sur `<html>` selon la locale, et sur le sélecteur de langue :
  `hreflang` + `aria-current`.

---

## 8. Performance

Budget à tenir, mesuré en Lighthouse mobile après build de production :
**Performance ≥ 90, Accessibilité ≥ 95, Bonnes pratiques ≥ 95, SEO ≥ 95.**

- Polices via `next/font` uniquement, `display: 'swap'`, préchargement du seul Display.
  Trois familles, c'est la limite : ne charge que les graisses listées au §2.2.
- Images via `next/image`, `priority` sur la seule image du hero, `sizes` renseigné partout,
  format AVIF/WebP, `placeholder="blur"` sur les visuels lourds.
- `framer-motion` importé uniquement dans les composants clients concernés ; les sections
  statiques restent des Server Components. Pas de `'use client'` sur une page entière.
- LCP visé < 2,0 s, CLS < 0,05, INP < 200 ms.
- Le SVG de grain est inline en data-URI : zéro requête réseau.

---

## 9. Internationalisation

Chaque libellé d'interface ajouté doit avoir sa clé FR et EN. Table minimale à compléter :

| Clé | FR | EN |
|---|---|---|
| `nav.skipToContent` | Aller au contenu | Skip to content |
| `hero.eyebrow` | Ingénierie industrielle | Industrial engineering |
| `hero.scroll` | Faire défiler | Scroll |
| `section.featuredWork` | Projets en vedette | Featured work |
| `section.caseStudy` | Étude de cas | Case study |
| `section.skills` | Ce que je sais faire | What I do |
| `section.timeline` | Parcours | Experience |
| `section.availability` | Disponibilité | Availability |
| `cta.readCaseStudy` | Lire l'étude | Read the case study |
| `cta.allProjects` | Tous les projets | All projects |
| `cta.writeMessage` | Écrire un message | Send a message |
| `cta.downloadCv` | Télécharger le CV | Download CV |
| `stat.scrapCost` | Coût de rebut — ligne L2 | Scrap cost — line L2 |

Vérifier que le rendu ne casse pas en anglais : les libellés anglais sont plus courts, les
français plus longs de 15 à 20 %. Aucune largeur fixe sur un conteneur de texte.

---

## 10. Ressources visuelles nécessaires

Si l'un de ces éléments manque dans `public/images/`, **arrête-toi et demande-le-moi** ;
ne remplis pas avec une image d'illustration générique, ça ruinerait le concept.

| Besoin | Format | Usage |
|---|---|---|
| Rendu CATIA V5 (bras de pelleteuse ou moteur 4 cyl.) | 1600×1000 min | carte projet CATIA, hero de son étude de cas |
| Capture Power BI (données floutées si sensibles) | 1600×1000 | bloc étude de cas Stellantis |
| Photo d'atelier ou de ligne | 2000×1200 | fond de hero alternatif |
| Schéma du système d'irrigation ESP32 | SVG ou PNG transparent | carte projet IoT |
| Logos organismes | déjà présents | bandeau |
| Trame de courbes de niveau | SVG | texture de fond |

---

## 11. Déroulé du travail

Une branche : `feat/refonte-visuelle`. Un commit par phase, message conventionnel
(`feat(ui): …`, `style(tokens): …`). **Tu t'arrêtes à chaque point de contrôle et tu me
montres le résultat avant de continuer.**

- **Phase 0 — Audit.** Lis l'arborescence, liste les composants et pages existants, repère
  ce qui est Server et ce qui est Client, et écris `DESIGN.md` avec les tokens retenus et
  ta lecture de la référence. Signale tout ce qui, dans ce brief, entre en conflit avec le
  code existant. **▸ Point de contrôle 1.**
- **Phase 1 — Fondations.** Variables CSS, config Tailwind, polices, `<Backdrop />`,
  classe `.section`, reset typographique. Une page de démonstration `/_styleguide`
  (non indexée, supprimée à la fin) montrant l'échelle typographique et la palette.
  **▸ Point de contrôle 2.**
- **Phase 2 — Primitives.** Les composants du §3, visibles dans le styleguide, tous états
  et variantes. **▸ Point de contrôle 3.**
- **Phase 3 — Header, Footer, transitions de page.** **▸ Point de contrôle 4.**
- **Phase 4 — Hero d'accueil et son orchestration.** C'est le morceau de bravoure, prends
  le temps. **▸ Point de contrôle 5.**
- **Phase 5 — Reste de l'accueil**, blocs 2 à 8.  **▸ Point de contrôle 6.**
- **Phase 6 — Pages internes**, dans l'ordre : `/projets`, `/projets/[slug]`, `/parcours`,
  `/competences`, `/contact`, `/cv`, `/mentions-legales`. **▸ Point de contrôle 7.**
- **Phase 7 — Passe de mouvement.** Révélations, parallaxe, compteurs, marquee,
  `prefers-reduced-motion`. **▸ Point de contrôle 8.**
- **Phase 8 — Qualité.** Accessibilité au clavier, contrastes, Lighthouse, build de
  production, suppression du styleguide, relecture du diff. **▸ Livraison.**

---

## 12. Critères de recette

À vérifier point par point avant de me dire que c'est fini :

- [ ] `npm run build` passe, aucun avertissement TypeScript ou ESLint nouveau.
- [ ] Les huit routes existent toujours en `/fr` et `/en`, aucun 404.
- [ ] Aucun texte de contenu modifié (vérifiable par `git diff` sur les fichiers de données).
- [ ] Lighthouse mobile : Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95.
- [ ] Navigation clavier complète, focus toujours visible.
- [ ] `prefers-reduced-motion: reduce` : plus aucune animation de position ni de compteur.
- [ ] Rendu correct à 320, 375, 768, 1440, 1920 px.
- [ ] Aucun état de survol collé après un tap sur mobile.
- [ ] Scroll fluide (60 fps) avec ralentissement CPU ×4 dans DevTools.
- [ ] Zéro dépendance ajoutée hors `framer-motion`.
- [ ] Styleguide supprimé.

---

## 13. À ne surtout pas faire

- Ajouter un préchargeur avec pourcentage, un curseur personnalisé, des particules, un fond
  animé en canvas, ou un effet de « bruit » qui tourne en continu. Ça coûte des images par
  seconde et ça ne raconte rien de mon métier.
- Mettre une entrée en fondu-montée sur chaque section : c'est le réflexe par défaut, il
  aplatit la hiérarchie et signale un gabarit.
- Numéroter des éléments qui ne forment pas une séquence.
- Multiplier les capitales trackées hors des deux usages autorisés.
- Ajouter des dégradés multicolores, des néons violets, ou une deuxième couleur d'accent.
- Arrondir les cartes à 12 ou 16px : la référence est nette et découpée.
- Traduire, réécrire ou « améliorer » mes textes.
- Enchaîner les phases sans t'arrêter aux points de contrôle.
