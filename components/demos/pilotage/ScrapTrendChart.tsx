"use client";

import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLocale, useTranslations } from "next-intl";
import { improvePhaseStartWeek, weeklyScrapRate } from "@/lib/demo-data/pilotage";
import { formatPercent } from "@/lib/demo-data/format";
import { ChartDataTable } from "./ChartDataTable";

type TooltipPayloadEntry = {
  value?: number;
};

function TrendTooltip({
  active,
  payload,
  label,
  locale,
  weekLabel,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: number;
  locale: string;
  weekLabel: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const rate = payload[0]?.value;

  return (
    <div className="border border-rule bg-surface px-3 py-2 text-xs">
      <p className="mb-1 font-medium text-ink font-data">
        {weekLabel} {label}
      </p>
      {typeof rate === "number" ? (
        <p className="font-data text-signal">{formatPercent(rate, locale)}</p>
      ) : null}
    </div>
  );
}

export function ScrapTrendChart() {
  const t = useTranslations("DemoPilotage");
  const locale = useLocale();

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="h-[320px] w-full min-w-[480px]">
          <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyScrapRate} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="var(--rule)" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: "var(--graphite)", fontSize: 12 }}
              tickLine={{ stroke: "var(--rule)" }}
              axisLine={{ stroke: "var(--rule)" }}
              label={{
                value: t("trend_axis_week"),
                position: "insideBottom",
                offset: -4,
                fill: "var(--steel)",
                fontSize: 11,
              }}
            />
            <YAxis
              tickFormatter={(v: number) => `${v}%`}
              tick={{ fill: "var(--steel)", fontSize: 11 }}
              tickLine={{ stroke: "var(--rule)" }}
              axisLine={{ stroke: "var(--rule)" }}
              domain={[0, "dataMax + 0.3"]}
            />
            <ReferenceLine
              x={improvePhaseStartWeek}
              stroke="var(--signal)"
              strokeDasharray="4 4"
            >
              <Label
                value={t("inflection_label")}
                position="top"
                fill="var(--signal)"
                fontSize={11}
              />
            </ReferenceLine>
            <Tooltip
              content={(props) => (
                <TrendTooltip
                  active={props.active}
                  payload={props.payload as unknown as TooltipPayloadEntry[] | undefined}
                  label={props.label as number | undefined}
                  locale={locale}
                  weekLabel={t("trend_table_col_week")}
                />
              )}
            />
            <Line
              type="monotone"
              dataKey="ratePercent"
              stroke="var(--accent)"
              strokeWidth={2}
              dot={{ r: 2, fill: "var(--accent)" }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ChartDataTable label={t("table_toggle_label")}>
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr>
              <th className="border-b border-rule py-1 pr-3 font-data text-xs uppercase text-steel">
                {t("trend_table_col_week")}
              </th>
              <th className="border-b border-rule py-1 font-data text-xs uppercase text-steel">
                {t("trend_table_col_rate")}
              </th>
            </tr>
          </thead>
          <tbody>
            {weeklyScrapRate.map((entry) => (
              <tr key={entry.week}>
                <td className="border-b border-rule py-1 pr-3 font-data text-graphite">
                  {entry.week}
                </td>
                <td className="border-b border-rule py-1 font-data text-graphite">
                  {formatPercent(entry.ratePercent, locale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartDataTable>
    </div>
  );
}
