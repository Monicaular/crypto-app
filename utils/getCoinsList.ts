import { axiosClient } from "./axiosClient";
import { CoinType } from "../types/coin";

export async function getCoinsList(): Promise<CoinType[]> {
    /* eslint-disable camelcase */
  const params = {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 100,
    page: 1,
    sparkline: true,
    price_change_percentage: "1h,24h,7d",
  };
  /* eslint-enable camelcase */
  const response = await axiosClient.get<CoinType[]>("/coins/markets", {
    params,
  });

  return response.data;
}
