// Seed data for the "gestion des consommables" demo (PRD §7.1 / M6).
//
// This is an ORIGINAL, from-scratch rebuild of the general concept behind the
// tool built during the Stellantis internship (stock of consumables, alert
// thresholds, per-workstation consumption, history log). It reproduces no
// Stellantis code, real part numbers, or real workstation names — the ids and
// quantities below are entirely invented and generic. Display names/units for
// consumables and workstations live in messages/{fr,en}.json under the
// "DemoConsommables" namespace, keyed by the ids declared here.

export type ConsumableId = "tape" | "gloves" | "wipes" | "grease" | "bits";

export type WorkstationId = "a" | "b" | "c" | "d";

export type ConsumableSeed = {
  id: ConsumableId;
  initialStock: number;
  threshold: number;
};

export type ConsumptionEvent = {
  sequence: number;
  consumableId: ConsumableId;
  workstationId: WorkstationId;
  quantity: number;
};

export const CONSUMABLE_SEEDS: ConsumableSeed[] = [
  { id: "tape", initialStock: 40, threshold: 10 },
  { id: "gloves", initialStock: 60, threshold: 15 },
  { id: "wipes", initialStock: 25, threshold: 8 },
  { id: "grease", initialStock: 12, threshold: 5 },
  { id: "bits", initialStock: 30, threshold: 10 },
];

export const WORKSTATION_IDS: WorkstationId[] = ["a", "b", "c", "d"];

export type StockState = Record<ConsumableId, number>;

export function makeInitialStock(): StockState {
  return Object.fromEntries(
    CONSUMABLE_SEEDS.map((seed) => [seed.id, seed.initialStock]),
  ) as StockState;
}
