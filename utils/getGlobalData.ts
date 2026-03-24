import { axiosClient } from "./axiosClient";
import { GlobalDataType } from "@/types/globalDataType";

export async function getGlobalData(): Promise<GlobalDataType> {
    const response = await axiosClient.get<{data: GlobalDataType }>(
        "/global"
    );

    return response.data.data;
    
}