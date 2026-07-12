"use client";

import { useAppSelector } from "@/state/hooks";
import ChartBase from "./ChartBase";

type VolumePoint = {
  time: string;
  volume: number;
};

export default function VolumeChart() {
  const { volumeData, timestamps, loading, coinId } = useAppSelector(
    (state) => state.chart,
  );

  const { coins } = useAppSelector((state) => state.coins);
  const coin = coins.find((c) => c.id === coinId);
  const currentVolume = coin?.total_volume;

  if (loading) {
    return (
      <div className="w-full h-64 bg-[#241e38] rounded-xl p-4 animate-pulse">
        Loading volume chart...
      </div>
    );
  }

  const volumeDataFormatted: VolumePoint[] = timestamps.map((t, i) => ({
    time: new Date(t).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    volume: volumeData[i],
  }));

  return (
    <ChartBase<VolumePoint>
      data={volumeDataFormatted}
      type="bar"
      color="#6366f1"
      dataKey="volume"
      gradientId="volumeGradient"
      title="Volume 24h"
      value={currentVolume}
    />
  );
}
