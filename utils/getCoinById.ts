import { axiosClient } from "./axiosClient";
import { CoinDetailType } from "@/types/coinDetail";

export async function getCoinById(coinId: string): Promise<CoinDetailType> {
    const response = await axiosClient.get(
        `/coins/${coinId}`, { params: {
            /* eslint-disable camelcase */
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false,
        }

        /* eslint-enable camelcase */

});

    return response.data;
    
}