// Shared numeric formatting for the pilotage-du-rebut demo charts — every
// on-chart number must be mono (PRD §8.3) and French-formatted in FR
// (comma decimal, non-breaking space before `%`).

export function formatPercent(value: number, locale: string): string {
  const formatted = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
  return locale === "fr" ? `${formatted} %` : `${formatted}%`;
}

export function formatCount(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US").format(value);
}
