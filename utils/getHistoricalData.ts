import { axiosClient } from "./axiosClient";

function convertRange(range: string) {
  switch (range) {
    case "1d":
      return { days: 1, label: "1D" };
    case "7d":
      return { days: 7, label: "7D" };
    case "14d":
      return { days: 14, label: "14D" };
    case "1m":
      return { days: 30, label: "1M" };
    case "3m":
      return { days: 90, label: "3M" };
    case "1y":
      return { days: 365, label: "1Y" };
    default:
      return { days: 1, label: "1D" };
  }
}

export async function getHistoricalData(
  coinId: string,
  range: string,
  currency: string,
) {
  const { days, label } = convertRange(range);
  const response = await axiosClient.get("api/chart", {
    params: { coinId, range, currency },
  });

  const prices = response.data.prices.map((p: [number, number]) => p[1]);
  const timestamps = response.data.prices.map((p: [number, number]) => p[0]);
  const volumes = response.data.total_volumes.map(
    (v: [number, number]) => v[1],
  );

  return { prices, timestamps, volumes, range, days, label };
}
