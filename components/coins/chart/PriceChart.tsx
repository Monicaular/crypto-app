"use client";

import { useAppSelector } from "@/state/hooks";
import ChartBase from "./ChartBase";

type PricePoint = {
  time: string;
  price: number;
};

export default function PriceChart() {
  const { priceData, timestamps, loading, coinId } = useAppSelector(
    (state) => state.chart,
  );

  const { coins } = useAppSelector((state) => state.coins);
  const coin = coins.find((c) => c.id === coinId);
  const currentPrice = coin?.current_price;
  const coinName = coin?.name;

  if (loading) {
    return (
      <div className="w-full h-64 bg-[#241e38] rounded-xl p-4 animate-pulse">
        Loading price chart...
      </div>
    );
  }

  const priceDataFormatted: PricePoint[] = timestamps.map((t, i) => ({
    time: new Date(t).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    price: priceData[i],
  }));

  return (
    <ChartBase<PricePoint>
      data={priceDataFormatted}
      type="area"
      color="#10b981"
      dataKey="price"
      gradientId="priceGradient"
      title={coinName}
      value={currentPrice}
    />
  );
}
