"use client";

import { useTranslations } from "next-intl";
import { CONSUMABLE_SEEDS, type StockState } from "./consommables-data";

export function ConsommablesStockTable({ stock }: { stock: StockState }) {
  const t = useTranslations("DemoConsommables");

  return (
    <div className="overflow-x-auto border border-rule bg-surface">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-rule text-left">
            <th className="px-3 py-2 font-normal text-steel">{t("stock_col_consumable")}</th>
            <th className="px-3 py-2 font-normal text-steel">{t("stock_col_stock")}</th>
            <th className="px-3 py-2 font-normal text-steel">{t("stock_col_threshold")}</th>
            <th className="px-3 py-2 font-normal text-steel">{t("stock_col_status")}</th>
          </tr>
        </thead>
        <tbody>
          {CONSUMABLE_SEEDS.map((seed) => {
            const currentStock = stock[seed.id];
            const isAlert = currentStock <= seed.threshold;

            return (
              <tr key={seed.id} className="border-b border-rule last:border-b-0">
                <td className="px-3 py-2 text-ink">
                  {t(`consumable_${seed.id}_name`)}{" "}
                  <span className="text-xs text-steel">({t(`consumable_${seed.id}_unit`)})</span>
                </td>
                <td className={`px-3 py-2 font-data ${isAlert ? "text-signal" : "text-ink"}`}>
                  {currentStock}
                </td>
                <td className="px-3 py-2 font-data text-steel">{seed.threshold}</td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-flex items-center rounded-[2px] border px-2 py-0.5 text-xs font-data ${
                      isAlert ? "border-signal text-signal" : "border-rule text-graphite"
                    }`}
                  >
                    {isAlert ? t("status_alert") : t("status_ok")}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
