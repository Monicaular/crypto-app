import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) return NextResponse.json({ coins: [] });

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key":
            process.env.COINGECKO_API_KEY ||
            process.env.NEXT_PUBLIC_COINGECKO_API_KEY ||
            "",
          "User-Agent": "Mozilla/5.0 (Vercel)",
        },
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) {
      return NextResponse.json([], { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data.coins || []);
  } catch (error) {
    console.error("❌API Route Network Error :", error);
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 },
    );
  }
}
