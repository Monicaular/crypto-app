import axios from "axios";
import { CoinType } from "@/types/coin";

export async function getCoinsList(currency: string): Promise<CoinType[]> {
  try {
    const response = await axios.get<CoinType[]>("/api/coins", {
      params: { currency },
    });
    return response.data;
  } catch (error) {
    console.error("❌Error inside getCoinsList utility:", error);
    return [];
  }
}
