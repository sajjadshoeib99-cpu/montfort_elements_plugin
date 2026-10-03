/** "$2.35 Million" — the editorial price style used across the site. */
export function formatPriceShort(value: number) {
  const millions = value / 1_000_000;
  const digits = Number.isInteger(millions) ? 0 : millions < 10 ? 2 : 1;
  return `$${millions.toFixed(digits)} Million`;
}

/** "$2,350,000" — full precision, used in detail views. */
export function formatPriceFull(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export function formatSqft(value: number) {
  return `${value.toLocaleString("en-US")} sq ft`;
}
