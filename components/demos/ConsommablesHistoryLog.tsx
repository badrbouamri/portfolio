"use client";

import { useTranslations } from "next-intl";
import { type ConsumptionEvent } from "./consommables-data";

export function ConsommablesHistoryLog({ history }: { history: ConsumptionEvent[] }) {
  const t = useTranslations("DemoConsommables");

  if (history.length === 0) {
    return (
      <p className="border border-rule bg-surface px-4 py-3 text-sm italic text-steel">
        {t("history_empty")}
      </p>
    );
  }

  const sorted = [...history].sort((a, b) => b.sequence - a.sequence);

  return (
    <ol className="flex flex-col gap-2 border border-rule bg-surface p-4 text-sm">
      {sorted.map((event) => (
        <li
          key={event.sequence}
          className="flex flex-col gap-0.5 border-b border-rule pb-2 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <span className="text-ink">
            {t("history_entry", {
              quantity: event.quantity,
              unit: t(`consumable_${event.consumableId}_unit`),
              consumable: t(`consumable_${event.consumableId}_name`),
              workstation: t(`workstation_${event.workstationId}_label`),
            })}
          </span>
          <span className="font-data text-xs text-steel">
            {t("history_event_label", { n: event.sequence })}
          </span>
        </li>
      ))}
    </ol>
  );
}
