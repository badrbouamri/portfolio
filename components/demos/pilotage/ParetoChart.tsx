"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLocale, useTranslations } from "next-intl";
import { computeParetoStats, type DefectCode } from "@/lib/demo-data/pilotage";
import { formatCount, formatPercent } from "@/lib/demo-data/format";
import { ChartDataTable } from "./ChartDataTable";

type TooltipPayloadEntry = {
  dataKey?: string | number;
  value?: number;
};

function ParetoTooltip({
  active,
  payload,
  label,
  locale,
  defectLabel,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
  locale: string;
  defectLabel: (code: string) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const count = payload.find((p) => p.dataKey === "count")?.value;
  const cumulative = payload.find((p) => p.dataKey === "cumulativePercent")?.value;

  return (
    <div className="border border-rule bg-surface px-3 py-2 text-xs shadow-none">
      <p className="mb-1 font-medium text-ink">{defectLabel(String(label))}</p>
      {typeof count === "number" ? (
        <p className="font-data text-graphite">{formatCount(count, locale)}</p>
      ) : null}
      {typeof cumulative === "number" ? (
        <p className="font-data text-signal">{formatPercent(cumulative, locale)}</p>
      ) : null}
    </div>
  );
}

export function ParetoChart() {
  const t = useTranslations("DemoPilotage");
  const locale = useLocale();
  const stats = computeParetoStats();

  const defectLabel = (code: string) => t(`defect_${code}` as `defect_${DefectCode}`);

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="h-[320px] w-full min-w-[480px]">
          <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={stats} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="var(--rule)" vertical={false} />
            <XAxis
              dataKey="code"
              tickFormatter={(code: string) => defectLabel(code)}
              tick={{ fill: "var(--graphite)", fontSize: 12 }}
              tickLine={{ stroke: "var(--rule)" }}
              axisLine={{ stroke: "var(--rule)" }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={56}
            />
            <YAxis
              yAxisId="count"
              tick={{ fill: "var(--steel)", fontSize: 11 }}
              tickLine={{ stroke: "var(--rule)" }}
              axisLine={{ stroke: "var(--rule)" }}
              label={{
                value: t("pareto_axis_count"),
                angle: -90,
                position: "insideLeft",
                fill: "var(--steel)",
                fontSize: 11,
              }}
            />
            <YAxis
              yAxisId="cumulative"
              orientation="right"
              domain={[0, 100]}
              tickFormatter={(v: number) => `${v}%`}
              tick={{ fill: "var(--steel)", fontSize: 11 }}
              tickLine={{ stroke: "var(--rule)" }}
              axisLine={{ stroke: "var(--rule)" }}
            />
            <ReferenceLine
              yAxisId="cumulative"
              y={80}
              stroke="var(--rule)"
              strokeDasharray="4 4"
            />
            <Tooltip
              content={(props) => (
                <ParetoTooltip
                  active={props.active}
                  payload={props.payload as unknown as TooltipPayloadEntry[] | undefined}
                  label={props.label as string | undefined}
                  locale={locale}
                  defectLabel={defectLabel}
                />
              )}
            />
            <Bar yAxisId="count" dataKey="count" fill="var(--accent)" radius={[2, 2, 0, 0]} />
            <Line
              yAxisId="cumulative"
              type="monotone"
              dataKey="cumulativePercent"
              stroke="var(--signal)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--signal)" }}
            />
          </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ChartDataTable label={t("table_toggle_label")}>
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr>
              <th className="border-b border-rule py-1 pr-3 font-data text-xs uppercase text-steel">
                {t("pareto_table_col_defect")}
              </th>
              <th className="border-b border-rule py-1 pr-3 font-data text-xs uppercase text-steel">
                {t("pareto_table_col_count")}
              </th>
              <th className="border-b border-rule py-1 pr-3 font-data text-xs uppercase text-steel">
                {t("pareto_table_col_percent")}
              </th>
              <th className="border-b border-rule py-1 font-data text-xs uppercase text-steel">
                {t("pareto_table_col_cumulative")}
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((entry) => (
              <tr key={entry.code}>
                <td className="border-b border-rule py-1 pr-3 text-ink">
                  {defectLabel(entry.code)}
                </td>
                <td className="border-b border-rule py-1 pr-3 font-data text-graphite">
                  {formatCount(entry.count, locale)}
                </td>
                <td className="border-b border-rule py-1 pr-3 font-data text-graphite">
                  {formatPercent(entry.percent, locale)}
                </td>
                <td className="border-b border-rule py-1 font-data text-graphite">
                  {formatPercent(entry.cumulativePercent, locale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartDataTable>
    </div>
  );
}
