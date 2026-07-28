import { SearchCoin } from "@/types/searchCoin";

export async function getSearchResults(query: string): Promise<SearchCoin[]> {
  if (!query || !query.trim()) return [];

  try {
    const res = await fetch(
      `/api/search?query=${encodeURIComponent(query.trim())}`,
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch search results:", error);
    return [];
  }
}
