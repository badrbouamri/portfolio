import type { CaseStudyFrontmatter } from "@/lib/schema";
import { Reveal } from "@/components/ui/Reveal";

export function KpiRow({ kpis }: { kpis: CaseStudyFrontmatter["kpis"] }) {
  if (kpis.length === 0) return null;

  return (
    <Reveal
      stagger
      data-print-avoid-break
      className="flex flex-wrap gap-6 border-y border-rule py-4"
    >
      {kpis.map((kpi) => (
        <div key={kpi.label}>
          <p className="kpi-snap font-data text-2xl text-accent">{kpi.value}</p>
          <p className="text-xs text-steel">
            {kpi.label}
            {kpi.note ? ` — ${kpi.note}` : ""}
          </p>
        </div>
      ))}
    </Reveal>
  );
}
