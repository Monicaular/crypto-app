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

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        return NextResponse.json(
            {error: "Failed to fetch coins" },
            { status: 500}
        );
    }
    const data = await res.json();
    
    return NextResponse.json(data);
   
}