type StatProps = {
  /** A raw number gets French formatting + suffix; case-study KPIs already
   *  arrive as pre-formatted strings from MDX frontmatter (e.g. "−33,8 %",
   *  "ST40") and are rendered as-is — `suffix` is ignored in that case. */
  value: number | string;
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
  const display =
    typeof value === "number"
      ? `${value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}${suffix.startsWith("%") ? ` ${suffix}` : suffix}`
      : value;

  return (
    <div className={className}>
      <p className="font-data text-data-lg text-accent">{display}</p>
      <p className="font-data text-label mt-1 uppercase text-steel">{label}</p>
    </div>
  );
}
