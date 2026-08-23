"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import {
  CONSUMABLE_SEEDS,
  WORKSTATION_IDS,
  type ConsumableId,
  type StockState,
  type WorkstationId,
} from "./consommables-data";

const fieldClassName =
  "border border-rule bg-surface px-2 py-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type ConsommablesConsumptionFormProps = {
  stock: StockState;
  onLogConsumption: (
    consumableId: ConsumableId,
    workstationId: WorkstationId,
    quantity: number,
  ) => string | null;
};

export function ConsommablesConsumptionForm({
  stock,
  onLogConsumption,
}: ConsommablesConsumptionFormProps) {
  const t = useTranslations("DemoConsommables");
  const [consumableId, setConsumableId] = useState<ConsumableId>(CONSUMABLE_SEEDS[0].id);
  const [workstationId, setWorkstationId] = useState<WorkstationId>(WORKSTATION_IDS[0]);
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState<string | null>(null);

  const availableStock = stock[consumableId];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedQuantity = Number(quantity);

    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      setError(t("form_error_quantity_invalid"));
      return;
    }

    const submissionError = onLogConsumption(consumableId, workstationId, parsedQuantity);
    if (submissionError) {
      setError(submissionError);
      return;
    }

    setError(null);
    setQuantity("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-rule bg-surface p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-steel">{t("form_workstation_label")}</span>
          <select
            value={workstationId}
            onChange={(event) => setWorkstationId(event.target.value as WorkstationId)}
            className={fieldClassName}
          >
            {WORKSTATION_IDS.map((id) => (
              <option key={id} value={id}>
                {t(`workstation_${id}_label`)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-steel">{t("form_consumable_label")}</span>
          <select
            value={consumableId}
            onChange={(event) => {
              setConsumableId(event.target.value as ConsumableId);
              setError(null);
            }}
            className={fieldClassName}
          >
            {CONSUMABLE_SEEDS.map((seed) => (
              <option key={seed.id} value={seed.id}>
                {t(`consumable_${seed.id}_name`)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-steel">
            {t("form_quantity_label")}{" "}
            <span className="font-data text-xs text-steel">
              ({t("form_available_label")}: {availableStock})
            </span>
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={availableStock}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className={`font-data ${fieldClassName}`}
          />
        </label>
      </div>

      {error ? <p className="text-sm text-signal">{error}</p> : null}

      <Button type="submit" className="self-start">
        {t("form_submit")}
      </Button>
    </form>
  );
}
