export function formatPercent(
  value: number | null | undefined,
  decimals: number = 0,
) {
  if (value == null) return "-";
  return value.toFixed(decimals) + "%";
}
