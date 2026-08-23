import type { CaseStudyFrontmatter } from "@/lib/schema";

export function KpiRow({ kpis }: { kpis: CaseStudyFrontmatter["kpis"] }) {
  if (kpis.length === 0) return null;

  return (
    <div data-print-avoid-break className="flex flex-wrap gap-6 border-y border-rule py-4">
      {kpis.map((kpi) => (
        <div key={kpi.label}>
          <p className="font-data text-2xl text-signal">{kpi.value}</p>
          <p className="text-xs text-steel">
            {kpi.label}
            {kpi.note ? ` — ${kpi.note}` : ""}
          </p>
        </div>
      ))}
    </div>
  );
}
