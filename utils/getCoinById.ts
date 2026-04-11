import { axiosClient } from "./axiosClient";
import { AxiosError } from "axios";
import { CoinDetailType } from "@/types/coinDetail";

export async function getCoinById(coinId: string): Promise<CoinDetailType> {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const params: Record<string, boolean> = {
            localization: false,
            tickers: false,
            "market_data": true,
            "community_data": false,
            "developer_data": false,
            sparkline: false,
        };
    const response = await axiosClient.get(
        `/coins/${coinId}`, { params});
    return response.data;
    
} catch(error: unknown) {
    const err = error as AxiosError;
    throw new Error(
        err.response?.status === 429 ? "Rate limit exceeded. Try again soon." : "Failed to fetch coin data"
    );
}
}