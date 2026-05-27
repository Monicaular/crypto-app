import { axiosClient } from "./axiosClient";
import { CoinType } from "../types/coin";

export async function getCoinsList(currency: string): Promise<CoinType[]> {
    /* eslint-disable camelcase */
  const params = {
    vs_currency: currency,
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
