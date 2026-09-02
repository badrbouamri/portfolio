type StatProps = {
  value: number;
  suffix?: string;
  label: string;
  /** Reserved for the Phase 7 count-up (BRIEF §5.6) — renders the final
   *  value statically until then. Defaults to true to match the eventual API. */
  animate?: boolean;
  className?: string;
};

// BRIEF §3 <Stat />. French number formatting (comma decimal, non-breaking
// space before %) per the sitewide numeric-data rule — this is data, so it's
// never machine-translated per locale, only ever set in --font-data.
export function Stat({ value, suffix = "", label, className = "" }: StatProps) {
  const formatted = value.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  const suffixText = suffix.startsWith("%") ? ` ${suffix}` : suffix;

  return (
    <div className={className}>
      <p className="font-data text-data-lg text-accent">
        {formatted}
        {suffixText}
      </p>
      <p className="font-data text-label mt-1 uppercase text-steel">{label}</p>
    </div>
  );
}
