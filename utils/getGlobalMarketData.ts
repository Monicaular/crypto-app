import axios from "axios";
import { GlobalMarketDataType } from "@/types/globalMarketDataType";

export async function getGlobalMarketData(): Promise<GlobalMarketDataType> {
  const res = await axios.get<GlobalMarketDataType>("/api/global");

  return res.data;
}
