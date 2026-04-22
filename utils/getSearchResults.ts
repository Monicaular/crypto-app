import { SearchCoin } from "@/types/searchCoin";
import { axiosClient } from "./axiosClient";

export async function getSearchResults(query: string) {
    if (!query) return [];
    const response = await axiosClient.get("/search", {params: {query}} );
    return response.data.coins as SearchCoin[];
}