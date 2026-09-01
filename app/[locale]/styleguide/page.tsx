import { Rule } from "@/components/ui/Rule";

// Redesign (BRIEF-REFONTE-PORTFOLIO.md §11, Phase 1). Internal reference only —
// not linked from anywhere, noindex'd below, and deleted at Phase 8 per the
// brief's own checklist. Renders real tokens from globals.css (not a mockup),
// so this is what the live app actually resolves — including through
// <Backdrop /> and the Header/Footer chrome from the root layout.
export const metadata = {
  robots: { index: false, follow: false },
};

const PALETTE: { token: string; role: string }[] = [
  { token: "paper", role: "fond de page" },
  { token: "surface", role: "cartes, surfaces" },
  { token: "surface-hover", role: "survol de surface" },
  { token: "ink", role: "texte principal" },
  { token: "graphite", role: "texte secondaire" },
  { token: "steel", role: "légendes, mono" },
  { token: "rule", role: "filets" },
  { token: "accent", role: "laiton — données, liens, actions" },
  { token: "signal", role: "focus clavier / halo de fond seulement" },
];

export default function StyleguidePage() {
  return (
    <div className="section mx-auto w-full max-w-[1200px] px-4 sm:px-6">
      <p className="font-data mb-2 text-xs uppercase tracking-wide text-steel">
        Phase 1 · Fondations — non indexé, supprimé en Phase 8
      </p>
      <h1 className="text-h2 mb-12 text-ink">Styleguide</h1>

      <section className="mb-16">
        <h2 className="text-h3 mb-6 text-ink">Palette</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {PALETTE.map((item) => (
            <div key={item.token} className="overflow-hidden rounded-hairline border border-rule">
              <div
                className="h-14"
                style={{ background: `var(--${item.token})` }}
                aria-hidden
              />
              <div className="bg-surface p-3">
                <p className="font-data text-sm text-ink">--{item.token}</p>
                <p className="text-xs text-steel">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Rule className="mb-16" />

      <section className="mb-16">
        <h2 className="text-h3 mb-6 text-ink">Échelle typographique</h2>
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-data mb-1 text-xs uppercase tracking-wide text-steel">
              text-hero — Bodoni Moda 400
            </p>
            <p className="text-hero text-ink">Badr Eddine</p>
          </div>
          <Rule />
          <div>
            <p className="font-data mb-1 text-xs uppercase tracking-wide text-steel">
              text-h2 — Bodoni Moda 400
            </p>
            <p className="text-h2 text-ink">Projets en vedette</p>
          </div>
          <Rule />
          <div>
            <p className="font-data mb-1 text-xs uppercase tracking-wide text-steel">
              text-h3 — Bodoni Moda 500
            </p>
            <p className="text-h3 font-medium text-ink">Maîtrise du coût de transformation</p>
          </div>
          <Rule />
          <div>
            <p className="font-data mb-1 text-xs uppercase tracking-wide text-steel">
              text-lead — Inter Tight 400
            </p>
            <p className="text-lead text-graphite">
              Ingénieur d&apos;État en génie mécanique, spécialisé en méthodes et industrialisation.
            </p>
          </div>
          <Rule />
          <div>
            <p className="font-data mb-1 text-xs uppercase tracking-wide text-steel">
              body — Inter Tight 400 (16px / 17px desktop)
            </p>
            <p className="measure text-graphite">
              Stages chez Stellantis, AIC Métallurgie et Nexteer Automotive — diagnostic de ligne,
              réduction du rebut, standardisation des postes de retouche.
            </p>
          </div>
          <Rule />
          <div>
            <p className="font-data mb-1 text-xs uppercase tracking-wide text-steel">
              text-data-lg — IBM Plex Mono, tabular-nums, --color-accent
            </p>
            <p className="font-data text-data-lg text-accent">−33,8 %</p>
          </div>
          <Rule />
          <div>
            <p className="font-data mb-1 text-xs uppercase tracking-wide text-steel">
              text-caption — Inter Tight 400
            </p>
            <p className="text-caption text-steel">Coût de rebut — ligne L2, période 2026-02 → 2026-07</p>
          </div>
          <Rule />
          <div>
            <p className="font-data mb-1 text-xs uppercase tracking-wide text-steel">
              text-label — IBM Plex Mono, tracked caps, --color-accent
            </p>
            <p className="font-data text-label uppercase text-accent">▸ Étude de cas 02 · Méthodes</p>
          </div>
        </div>
      </section>
    </div>
  );
}
