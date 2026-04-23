import { axiosClient } from "./axiosClient";
import { GlobalMarketDataType } from "@/types/globalMarketDataType";

export async function getGlobalMarketData(): Promise<GlobalMarketDataType> {
    const response = await axiosClient.get<{data: GlobalMarketDataType }>(
        "/global"
    );

    return response.data.data;
    
}