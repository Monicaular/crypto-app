import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.coingecko.com/api/v3/global");

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch global market data" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data.data);
}
