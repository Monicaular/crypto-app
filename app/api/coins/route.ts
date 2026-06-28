import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const currency = searchParams.get("currency") || "usd";

  const url =
    "https://api.coingecko.com/api/v3/coins/markets" +
    `?vs_currency=${currency}` +
    "&order=market_cap_desc" +
    "&per_page=100" +
    "&page=1" +
    "&sparkline=true" +
    "&price_change_percentage=1h,24h,7d";

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key":
          process.env.COINGECKO_API_KEY ||
          process.env.NEXT_PUBLIC_COINGECKO_API_KEY ||
          "",
        "User-Agent": "Mozilla/5.0 (Vercel)",
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error(`❌CoinGecko Error: ${res.status} ${res.statusText}`);
      return NextResponse.json(
        { error: `CoinGecko API responded with status ${res.status}` },
        { status: res.status },
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌API Route Network Error :", error);
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 },
    );
  }
}
