"use client";

import { useTranslations } from "next-intl";
import { WORKSTATION_IDS, type ConsumptionEvent } from "./consommables-data";

export function ConsommablesWorkstationSummary({ history }: { history: ConsumptionEvent[] }) {
  const t = useTranslations("DemoConsommables");

  const totals = WORKSTATION_IDS.map((id) => {
    const events = history.filter((event) => event.workstationId === id);
    const totalQuantity = events.reduce((sum, event) => sum + event.quantity, 0);
    return { id, eventCount: events.length, totalQuantity };
  });

  return (
    <div className="overflow-x-auto border border-rule bg-surface">
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-rule text-left">
            <th className="px-3 py-2 font-normal text-steel">{t("workstation_col_workstation")}</th>
            <th className="px-3 py-2 font-normal text-steel">{t("workstation_col_events")}</th>
            <th className="px-3 py-2 font-normal text-steel">{t("workstation_col_quantity")}</th>
          </tr>
        </thead>
        <tbody>
          {totals.map((row) => (
            <tr key={row.id} className="border-b border-rule last:border-b-0">
              <td className="px-3 py-2 text-ink">{t(`workstation_${row.id}_label`)}</td>
              <td className="px-3 py-2 font-data text-ink">{row.eventCount}</td>
              <td className="px-3 py-2 font-data text-ink">{row.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {history.length === 0 ? (
        <p className="border-t border-rule px-3 py-2 text-sm italic text-steel">
          {t("workstation_empty")}
        </p>
      ) : null}
    </div>
  );
}
