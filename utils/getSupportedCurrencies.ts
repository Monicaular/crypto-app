import { axiosClient } from "./axiosClient";
import { SupportedCurrencies } from "@/types/supportedCurrencies";

export async function getSupportedCurrencies(): Promise<SupportedCurrencies> {
    const response = await axiosClient.get<SupportedCurrencies>(
        "/simple/supported_vs_currencies"
    );

    return response.data;
    
}