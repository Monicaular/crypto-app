import { axiosClient } from "./axiosClient";
import { CoinType } from "../types/coin";

export async function getCoinsList(): Promise<CoinType[]> {
    const response = await axiosClient.get<CoinType[]>(
        "/coins/markets", { params: {
            /* eslint-disable camelcase */
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
            price_change_percentage: "24h"
        }
        /* eslint-enable camelcase */

});

    return response.data;
    
}

