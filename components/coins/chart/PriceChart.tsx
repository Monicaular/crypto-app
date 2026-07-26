"use client";

import { useAppSelector } from "@/state/hooks";
import ChartBase from "./ChartBase";

export type PricePoint = {
  time: string;
  [coinId: string]: string | number;
};

export default function PriceChart() {
  const { selectedCoins, coinsData, isCompareMode, loading } = useAppSelector(
    (state) => state.chart,
  );

  const { coins } = useAppSelector((state) => state.coins);
  const primaryCoinId = selectedCoins[0];
  const secondaryCoinId = selectedCoins[1];
  const primaryCoin = coins.find((c) => c.id === primaryCoinId);
  const secondaryCoin = coins.find((c) => c.id === secondaryCoinId);

  if (loading) {
    return (
      <div className="w-full h-64 bg-[#241e38] rounded-xl p-4 animate-pulse">
        Loading price chart...
      </div>
    );
  }

  const primaryData = coinsData[primaryCoinId];
  if (!primaryData || !primaryData.timestamps) return null;

  const priceDataFormatted = primaryData.timestamps.map((t, i) => {
    const timeLabel = new Date(t).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const point: PricePoint = { time: timeLabel };

    selectedCoins.forEach((coinId) => {
      const coinChart = coinsData[coinId];
      if (coinChart && coinChart.prices[i] !== undefined) {
        point[coinId] = coinChart.prices[i];
      }
    });
    return point;
  });

  const title =
    isCompareMode && secondaryCoin
      ? `${primaryCoin?.name || primaryCoinId} vs ${secondaryCoin.name}`
      : primaryCoin?.name || primaryCoinId;

  return (
    <ChartBase<PricePoint>
      data={priceDataFormatted}
      type="area"
      color="#be29ec"
      dataKey={primaryCoinId}
      secondaryDataKey={isCompareMode ? secondaryCoinId : undefined}
      secondaryColor="#EFBBFF"
      gradientId="priceGradient"
      title={title}
      value={isCompareMode ? undefined : primaryCoin?.current_price}
      isCompareMode={isCompareMode}
    />
  );
}
