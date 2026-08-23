"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import {
  makeInitialStock,
  type ConsumableId,
  type ConsumptionEvent,
  type StockState,
  type WorkstationId,
} from "./consommables-data";
import { ConsommablesStockTable } from "./ConsommablesStockTable";
import { ConsommablesConsumptionForm } from "./ConsommablesConsumptionForm";
import { ConsommablesWorkstationSummary } from "./ConsommablesWorkstationSummary";
import { ConsommablesHistoryLog } from "./ConsommablesHistoryLog";

// Entire app runs on seeded in-memory React state — no database, no auth, no
// network calls (PRD §7.1 / §11.2). "Reset" restores the exact seed values so
// a visitor can never leave the demo broken for the next one.
export function ConsommablesApp() {
  const t = useTranslations("DemoConsommables");
  const [stock, setStock] = useState<StockState>(() => makeInitialStock());
  const [history, setHistory] = useState<ConsumptionEvent[]>([]);
  const [resetAnnouncement, setResetAnnouncement] = useState("");

  function handleLogConsumption(
    consumableId: ConsumableId,
    workstationId: WorkstationId,
    quantity: number,
  ): string | null {
    const currentStock = stock[consumableId];
    if (quantity > currentStock) {
      return t("form_error_quantity_exceeds_stock");
    }

    setStock((prev) => ({ ...prev, [consumableId]: prev[consumableId] - quantity }));
    setHistory((prev) => [{ sequence: prev.length + 1, consumableId, workstationId, quantity }, ...prev]);
    setResetAnnouncement("");
    return null;
  }

  function handleReset() {
    setStock(makeInitialStock());
    setHistory([]);
    setResetAnnouncement(t("reset_status"));
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="border-l-2 border-signal bg-surface px-4 py-2 text-sm italic text-steel">
        {t("banner")}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="measure text-sm text-graphite">{t("intro")}</p>
        <Button variant="secondary" onClick={handleReset} className="self-start sm:self-auto sm:shrink-0">
          {t("reset_button")}
        </Button>
      </div>

      <p aria-live="polite" className="sr-only">
        {resetAnnouncement}
      </p>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg text-ink">{t("stock_heading")}</h2>
        <ConsommablesStockTable stock={stock} />
      </section>

      <Rule />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg text-ink">{t("form_heading")}</h2>
        <ConsommablesConsumptionForm stock={stock} onLogConsumption={handleLogConsumption} />
      </section>

      <Rule />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg text-ink">{t("workstation_heading")}</h2>
        <ConsommablesWorkstationSummary history={history} />
      </section>

      <Rule />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg text-ink">{t("history_heading")}</h2>
        <ConsommablesHistoryLog history={history} />
      </section>
    </div>
  );
}
