import axios from "axios";
import { CoinType } from "@/types/coin";

export async function getCoinsList(currency: string): Promise<CoinType[]> {
  const response = await axios.get<CoinType[]>("/api/coins", {
    params: { currency },
  });

  return response.data;
}
