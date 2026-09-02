import { Rule } from "@/components/ui/Rule";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FramedImage } from "@/components/ui/FramedImage";
import { Stat } from "@/components/ui/Stat";

// Redesign (BRIEF-REFONTE-PORTFOLIO.md §11, Phase 1-2). Internal reference
// only — not linked from anywhere, noindex'd below, and deleted at Phase 8
// per the brief's own checklist. Renders real tokens/components from
// globals.css and components/ui/ (not a mockup), so this is what the live
// app actually resolves — including through <Backdrop /> and the
// Header/Footer chrome from the root layout.
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

      <Rule className="mb-16" />

      <section className="mb-16">
        <h2 className="text-h3 mb-6 text-ink">Composants</h2>

        <div className="mb-10">
          <p className="font-data mb-3 text-xs uppercase tracking-wide text-steel">SectionLabel</p>
          <SectionLabel>Ingénierie industrielle</SectionLabel>
        </div>

        <div className="mb-10">
          <p className="font-data mb-3 text-xs uppercase tracking-wide text-steel">
            Button — ghost (défaut) / solid, avec état focus et arrow nudge
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button>
              Lire l&apos;étude <span className="cta-arrow">→</span>
            </Button>
            <Button variant="solid">Écrire un message</Button>
            <Button href="#" variant="ghost">
              Rendu en &lt;a&gt;
            </Button>
            <Button disabled>Désactivé</Button>
          </div>
        </div>

        <div className="mb-10">
          <p className="font-data mb-3 text-xs uppercase tracking-wide text-steel">
            Card — default / feature / flat (survol desktop seulement)
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <p className="font-data text-xs uppercase tracking-wide text-accent">Étude de cas</p>
              <h3 className="text-h3 mt-2 text-ink">Défaut</h3>
              <p className="mt-2 text-sm text-graphite">Survole-moi (desktop).</p>
            </Card>
            <Card variant="feature">
              <p className="font-data text-xs uppercase tracking-wide text-accent">Étude de cas</p>
              <h3 className="text-h3 mt-2 text-ink">Feature</h3>
              <p className="mt-2 text-sm text-graphite">Plus haute — image en haut en usage réel.</p>
            </Card>
            <Card variant="flat">
              <p className="font-data text-xs uppercase tracking-wide text-accent">Étude de cas</p>
              <h3 className="text-h3 mt-2 text-ink">Flat</h3>
              <p className="mt-2 text-sm text-graphite">Jamais de survol.</p>
            </Card>
          </div>
        </div>

        <div className="mb-10">
          <p className="font-data mb-3 text-xs uppercase tracking-wide text-steel">FramedImage</p>
          <div className="max-w-sm">
            <FramedImage
              src="/images/cover.jpg"
              alt="Poste de travail, exemple de rendu FramedImage"
              caption="Fig. — cadre 1px décalé, légende alignée à gauche."
              ratio="4/3"
            />
          </div>
        </div>

        <div className="mb-10">
          <p className="font-data mb-3 text-xs uppercase tracking-wide text-steel">Stat</p>
          <div className="flex flex-wrap gap-10">
            <Stat value={-33.8} suffix="%" label="Coût de rebut · L2" />
            <Stat value={40} label="Poste ST40" />
          </div>
        </div>

        <div>
          <p className="font-data mb-3 text-xs uppercase tracking-wide text-steel">
            Divider — accent (BRIEF §3) vs. Rule simple
          </p>
          <div className="flex flex-col gap-4">
            <Rule accent />
            <Rule />
          </div>
        </div>
      </section>
    </div>
  );
}
