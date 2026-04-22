import { axiosClient } from "./axiosClient";
import { CoinDetailType } from "@/types/coinDetail";

export async function getCoinById(coinId: string): Promise<CoinDetailType> {
  const params: Record<string, boolean> = {
    localization: false,
    tickers: false,
    "market_data": true,
    "community_data": false,
    "developer_data": false,
    sparkline: false,
  };
  const response = await axiosClient.get(`/coins/${coinId}`, { params });
  return response.data;
}
