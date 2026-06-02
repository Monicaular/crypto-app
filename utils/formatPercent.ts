export function formatPercent(
  value: number | null | undefined,
  decimals: number,
) {
  if (value == null) return "-";
  return value.toFixed(decimals) + "%";
}
