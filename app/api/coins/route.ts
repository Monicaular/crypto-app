import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    //create a new url object and extract the searchParmas which lets you read query paramaters
    const currency = searchParams.get("currency") || "usd";
    //try to read the currency query parameter
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
    //parse the response body as json
    return NextResponse.json(data);
    //send the parsed data back to the client as json
}