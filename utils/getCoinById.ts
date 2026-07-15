export async function getCoinById(coinId: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/coins/${coinId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch coin data");
  return res.json();
}
