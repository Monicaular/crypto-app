import { axiosClient } from "./axiosClient";
import { CoinType } from "../types/coin";

export async function getCoinsList(): Promise<CoinType[]> {
    const response = await axiosClient.get<CoinType[]>(
        "/coins/markets?vs_currency=usd"
    );

    return response.data;
    
}

