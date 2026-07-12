import { axiosClient } from "./axiosClient";

function convertRangeToDays(range: string) {
  switch (range) {
    case "1d":
      return 1;
    case "7d":
      return 7;
    case "14d":
      return 14;
    case "1m":
      return 30;
    case "3m":
      return 90;
    case "1y":
      return 365;
    default:
      return 1;
  }
}

export async function getHistoricalData(coinId: string, range: string) {
  const response = await axiosClient.get(`/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: "usd",
      days: convertRangeToDays(range),
    },
  });

  const prices = response.data.prices.map((p: [number, number]) => p[1]);
  const timestamps = response.data.prices.map((p: [number, number]) => p[0]);
  const volumes = response.data.total_volumes.map(
    (v: [number, number]) => v[1],
  );

  return { prices, timestamps, volumes };
}
