"use client";

import { useAppSelector } from "@/state/hooks";
import ChartBase from "./ChartBase";

export type VolumePoint = {
  time: string;
  [coinId: string]: string | number;
};

export default function VolumeChart() {
  const { selectedCoins, coinsData, isCompareMode, loading } = useAppSelector(
    (state) => state.chart,
  );

  const { coins } = useAppSelector((state) => state.coins);
  const primaryCoinId = selectedCoins[0];
  const secondaryCoinId = selectedCoins[1];
  const primaryCoin = coins.find((c) => c.id === primaryCoinId);

  if (loading) {
    return (
      <div className="w-full h-64 bg-[#241e38] rounded-xl p-4 animate-pulse">
        Loading volume chart...
      </div>
    );
  }

  const primaryData = coinsData[primaryCoinId];
  if (!primaryData || !primaryData.timestamps) return null;

  const volumeDataFormatted = primaryData.timestamps.map((t, i) => {
    const timeLabel = new Date(t).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const point: VolumePoint = { time: timeLabel };

    selectedCoins.forEach((coinId) => {
      const coinChart = coinsData[coinId];
      if (coinChart && coinChart.volumes[i] !== undefined) {
        point[coinId] = coinChart.volumes[i];
      }
    });
    return point;
  });

  return (
    <ChartBase<VolumePoint>
      data={volumeDataFormatted}
      type="bar"
      color="#298c8c"
      dataKey={primaryCoinId}
      secondaryDataKey={isCompareMode ? secondaryCoinId : undefined}
      secondaryColor="#800074"
      gradientId="volumeGradient"
      title="Volume 24h"
      value={isCompareMode ? undefined : primaryCoin?.total_volume}
      isCompareMode={isCompareMode}
    />
  );
}
