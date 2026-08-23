import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { featureFlags } from "@/lib/feature-flags";
import { Section } from "@/components/ui/Section";
import { Rule } from "@/components/ui/Rule";
import { ParetoChart } from "@/components/demos/pilotage/ParetoChart";
import { ScrapTrendChart } from "@/components/demos/pilotage/ScrapTrendChart";
import { ShiftStationBreakdown } from "@/components/demos/pilotage/ShiftStationBreakdown";

export default async function PilotageDemoPage() {
  // Demos ship behind a flag and 404 cleanly (not a "coming soon" page)
  // until manually reviewed and mobile-tested (PRD §11.2).
  if (!featureFlags.demoPilotage) {
    notFound();
  }

  const t = await getTranslations("DemoPilotage");

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")}>
      <p className="measure mb-6 text-graphite">{t("subtitle")}</p>

      <div className="mb-8 border border-rule bg-surface px-4 py-3">
        <p className="measure text-sm text-graphite">{t("disclaimer")}</p>
      </div>

      <div data-demo-root className="flex flex-col gap-10">
        <div>
          <h2 className="mb-1 text-lg text-ink">{t("section_pareto_heading")}</h2>
          <p className="measure mb-4 text-sm text-graphite">{t("section_pareto_intro")}</p>
          <ParetoChart />
        </div>

        <Rule />

        <div>
          <h2 className="mb-1 text-lg text-ink">{t("section_trend_heading")}</h2>
          <p className="measure mb-4 text-sm text-graphite">{t("section_trend_intro")}</p>
          <ScrapTrendChart />
        </div>

        <Rule />

        <div>
          <h2 className="mb-1 text-lg text-ink">{t("section_breakdown_heading")}</h2>
          <p className="measure mb-4 text-sm text-graphite">{t("section_breakdown_intro")}</p>
          <ShiftStationBreakdown />
        </div>
      </div>
    </Section>
  );
}
