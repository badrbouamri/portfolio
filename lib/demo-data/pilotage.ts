// ---------------------------------------------------------------------------
// SYNTHETIC DATA — NOT REAL STELLANTIS DATA
//
// Every number in this file is fabricated for demonstration purposes. It
// contains no real production figures, volumes, costs, or dates from any
// employer. The shape (dominant defect category, DMAIC-style improvement
// inflection, ST40 as the largest contributing station) is deliberately
// consistent with the *public, already-anonymised* narrative told in
// `content/fr/projets/stellantis-maitrise-cout-transformation.mdx` — a real
// DMAIC project that reduced scrap cost by 33.8% on line L2 — so that this
// demo reads as plausible to a manufacturing engineer without exposing any
// confidential or real figure. Do not replace these numbers with real data.
// ---------------------------------------------------------------------------

export type DefectCode =
  | "etancheite"
  | "conformation"
  | "assemblage"
  | "dimensionnel"
  | "aspect"
  | "process"
  | "autre";

export type ShiftCode = "matin" | "apres_midi" | "nuit";

export type StationCode = "st10" | "st20" | "st30" | "st40" | "st50";

export const DEFECT_CODES: DefectCode[] = [
  "etancheite",
  "conformation",
  "assemblage",
  "dimensionnel",
  "aspect",
  "process",
  "autre",
];

export const SHIFT_CODES: ShiftCode[] = ["matin", "apres_midi", "nuit"];

export const STATION_CODES: StationCode[] = ["st10", "st20", "st30", "st40", "st50"];

/**
 * Synthetic defect counts over the demo period, ordered descending — a
 * realistic 80/20 Pareto. Sealing/adhesive-application defects ("etancheite")
 * dominate, matching the real case study's diagnosis that étanchéité issues
 * on the ST40 robotic adhesive-application/conformation cell were the
 * largest contributor to scrap on line L2. Total: 1 000 synthetic events.
 */
export const paretoDefectCounts: Record<DefectCode, number> = {
  etancheite: 380,
  conformation: 220,
  assemblage: 140,
  dimensionnel: 100,
  aspect: 80,
  process: 50,
  autre: 30,
};

export type ParetoEntry = {
  code: DefectCode;
  count: number;
  percent: number;
  cumulativePercent: number;
};

/**
 * Derives percent + cumulative percent from the raw counts above, in
 * descending order, so there is a single source of truth for the totals.
 */
export function computeParetoStats(): ParetoEntry[] {
  const total = DEFECT_CODES.reduce((sum, code) => sum + paretoDefectCounts[code], 0);
  let cumulative = 0;
  return DEFECT_CODES.map((code) => {
    const count = paretoDefectCounts[code];
    const percent = (count / total) * 100;
    cumulative += percent;
    return { code, count, percent, cumulativePercent: cumulative };
  });
}

export type WeeklyScrapRate = {
  week: number;
  ratePercent: number;
};

/**
 * Synthetic weekly scrap rate on line L2 over a 20-week window shaped to
 * read as a real DMAIC arc: elevated and drifting during Define/Measure/
 * Analyze (weeks 1–10), a visible downward inflection once Improve-phase
 * actions land (from week 11), settling at a lower, stable Control-phase
 * rate (weeks 16–20). Week 1 vs. week 20 here is a ~31% drop; the six-week
 * average before vs. after the inflection is a ~34% drop — consistent with,
 * without literally reproducing, the real case study's 33.8% figure.
 */
export const weeklyScrapRate: WeeklyScrapRate[] = [
  { week: 1, ratePercent: 3.2 },
  { week: 2, ratePercent: 3.35 },
  { week: 3, ratePercent: 3.28 },
  { week: 4, ratePercent: 3.42 },
  { week: 5, ratePercent: 3.51 },
  { week: 6, ratePercent: 3.44 },
  { week: 7, ratePercent: 3.58 },
  { week: 8, ratePercent: 3.62 },
  { week: 9, ratePercent: 3.55 },
  { week: 10, ratePercent: 3.6 },
  { week: 11, ratePercent: 3.4 },
  { week: 12, ratePercent: 3.05 },
  { week: 13, ratePercent: 2.7 },
  { week: 14, ratePercent: 2.45 },
  { week: 15, ratePercent: 2.3 },
  { week: 16, ratePercent: 2.25 },
  { week: 17, ratePercent: 2.18 },
  { week: 18, ratePercent: 2.22 },
  { week: 19, ratePercent: 2.15 },
  { week: 20, ratePercent: 2.2 },
];

/** Week from which "Improve"-phase actions are modelled as having landed. */
export const improvePhaseStartWeek = 11;

/**
 * Synthetic defect counts by shift and station. Same synthetic population
 * as the Pareto above (1 000 events total), sliced two ways. The night
 * shift ("nuit") carries a disproportionate share, consistent with a
 * plausible real-world pattern of lighter supervision on nights. Station
 * ST40 — the robotic adhesive-application/conformation cell named in the
 * real case study — is the largest single contributor across every shift.
 */
export const shiftStationScrap: Record<ShiftCode, Record<StationCode, number>> = {
  matin: { st10: 45, st20: 55, st30: 45, st40: 120, st50: 35 },
  apres_midi: { st10: 48, st20: 58, st30: 48, st40: 130, st50: 36 },
  nuit: { st10: 57, st20: 67, st30: 57, st40: 150, st50: 49 },
};

export function computeStationTotals(shift: ShiftCode | "toutes"): Record<StationCode, number> {
  if (shift !== "toutes") {
    return shiftStationScrap[shift];
  }
  const totals: Record<StationCode, number> = { st10: 0, st20: 0, st30: 0, st40: 0, st50: 0 };
  for (const s of SHIFT_CODES) {
    for (const station of STATION_CODES) {
      totals[station] += shiftStationScrap[s][station];
    }
  }
  return totals;
}
