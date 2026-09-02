import { Link } from "@/i18n/navigation";
import { Rule } from "@/components/ui/Rule";

type CompetenceItem = {
  titre: string;
  evidence: string;
  slug: string;
};

// BRIEF §4.1 Bloc 6 — a list, not cards: each entry is a full-width row
// separated by a <Divider />. On row hover, the rule above it sweeps to
// --accent across the full width (scaleX from the left) — the same
// left-to-right ruler-tick gesture as nav-link/sweep-fill elsewhere, applied
// to the row's own top edge instead of a static divider.
export function CompetenceList({ items }: { items: CompetenceItem[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={item.titre}>
          {i > 0 ? <Rule /> : null}
          <Link href={`/projets/${item.slug}`} className="competence-row group relative block py-6">
            <span aria-hidden className="competence-row-rule absolute left-0 top-0 h-[2px] w-full bg-accent" />
            <h3 className="text-h3 text-ink transition-colors group-hover:text-accent">{item.titre}</h3>
            <p className="mt-2 max-w-[68ch] text-sm text-graphite">{item.evidence}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
