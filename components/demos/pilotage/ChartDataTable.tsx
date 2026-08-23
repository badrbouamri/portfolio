import { type ReactNode } from "react";

// Accessible data-table fallback for a chart (PRD §8.9 — "charts carry an
// accessible data table fallback"). Rendered as a native <details>/<summary>
// disclosure: present in the DOM (and in the accessibility tree) at all
// times, collapsed by default so it doesn't compete visually with the
// chart, but reachable and operable by keyboard and screen readers without
// any bespoke ARIA wiring.
export function ChartDataTable({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <details className="mt-3 border-t border-rule pt-2">
      <summary className="cursor-pointer text-xs font-data uppercase tracking-wide text-steel hover:text-accent">
        {label}
      </summary>
      <div className="mt-3 overflow-x-auto">{children}</div>
    </details>
  );
}
