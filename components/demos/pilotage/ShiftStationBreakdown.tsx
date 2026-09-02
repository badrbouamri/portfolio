"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { computeStationTotals, STATION_CODES, SHIFT_CODES, type ShiftCode } from "@/lib/demo-data/pilotage";
import { formatCount } from "@/lib/demo-data/format";
import { ChartDataTable } from "./ChartDataTable";

type ShiftFilter = ShiftCode | "toutes";

type TooltipPayloadEntry = {
  value?: number;
};

function BreakdownTooltip({
  active,
  payload,
  label,
  locale,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
  locale: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const count = payload[0]?.value;

  return (
    <div className="border border-rule bg-surface px-3 py-2 text-xs">
      <p className="mb-1 font-medium text-ink">{label?.toUpperCase()}</p>
      {typeof count === "number" ? (
        <p className="font-data text-graphite">{formatCount(count, locale)}</p>
      ) : null}
    </div>
  );
}

export function ShiftStationBreakdown() {
  const t = useTranslations("DemoPilotage");
  const locale = useLocale();
  const [shift, setShift] = useState<ShiftFilter>("toutes");

  const totals = useMemo(() => computeStationTotals(shift), [shift]);
  const data = STATION_CODES.map((station) => ({ station, count: totals[station] }));
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div>
      <div
        role="group"
        aria-label={t("filter_label")}
        className="mb-4 flex flex-wrap gap-2"
      >
        <Button
          type="button"
          variant={shift === "toutes" ? "solid" : "ghost"}
          aria-pressed={shift === "toutes"}
          onClick={() => setShift("toutes")}
        >
          {t("filter_all")}
        </Button>
        {SHIFT_CODES.map((code) => (
          <Button
            key={code}
            type="button"
            variant={shift === code ? "solid" : "ghost"}
            aria-pressed={shift === code}
            onClick={() => setShift(code)}
          >
            {t(`filter_${code}`)}
          </Button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div className="h-[280px] w-full min-w-[420px]">
          <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="var(--rule)" vertical={false} />
            <XAxis
              dataKey="station"
              tickFormatter={(s: string) => s.toUpperCase()}
              tick={{ fill: "var(--graphite)", fontSize: 12 }}
              tickLine={{ stroke: "var(--rule)" }}
              axisLine={{ stroke: "var(--rule)" }}
            />
            <YAxis
              tick={{ fill: "var(--steel)", fontSize: 11 }}
              tickLine={{ stroke: "var(--rule)" }}
              axisLine={{ stroke: "var(--rule)" }}
            />
            <Tooltip
              content={(props) => (
                <BreakdownTooltip
                  active={props.active}
                  payload={props.payload as unknown as TooltipPayloadEntry[] | undefined}
                  label={props.label as string | undefined}
                  locale={locale}
                />
              )}
            />
            <Bar dataKey="count" radius={[2, 2, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.station}
                  fill={entry.count === maxCount ? "var(--signal)" : "var(--accent)"}
                />
              ))}
            </Bar>
          </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ChartDataTable label={t("table_toggle_label")}>
        <table className="w-full min-w-[280px] text-left text-sm">
          <thead>
            <tr>
              <th className="border-b border-rule py-1 pr-3 font-data text-xs uppercase text-steel">
                {t("breakdown_table_col_station")}
              </th>
              <th className="border-b border-rule py-1 font-data text-xs uppercase text-steel">
                {t("breakdown_table_col_count")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.station}>
                <td className="border-b border-rule py-1 pr-3 text-ink">
                  {entry.station.toUpperCase()}
                </td>
                <td className="border-b border-rule py-1 font-data text-graphite">
                  {formatCount(entry.count, locale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartDataTable>
    </div>
  );
}
