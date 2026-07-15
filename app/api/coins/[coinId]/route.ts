import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ coinId: string }>;
}

export async function GET(req: Request, { params }: RouteContext) {
  const { coinId } = await params;

  const url =
    `https://api.coingecko.com/api/v3/coins/${coinId}` +
    "?localization=false" +
    "&tickers=false" +
    "&market_data=true" +
    "&community_data=false" +
    "&developer_data=false" +
    "&sparkline=true";

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
    console.error("❌Chart API Route Network Error :", error);
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 },
    );
  }
}
