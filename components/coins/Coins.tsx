"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import { fetchCoins } from "@/store/coinsSlice";
import CoinsTable from "./CoinsTable";
import MarketLeadersCarousel from "./MarketLeadersCarousel";
import PriceChart from "./chart/PriceChart";
import VolumeChart from "./chart/VolumeChart";
import { fetchChartData } from "@/store/chartSlice";

export default function Coins() {
  const dispatch = useAppDispatch();
  const { coins, loading, error } = useAppSelector((state) => state.coins);
  const { coinId, range } = useAppSelector((state) => state.chart);

  useEffect(() => {
    dispatch(fetchCoins());
    dispatch(fetchChartData({ coinId, range}));
  }, [dispatch, coinId, range]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <MarketLeadersCarousel coins={coins}/>
      <div className="flex gap-4">
        <PriceChart />
      <VolumeChart />
      </div>
      <CoinsTable coins={coins} />
    </div>
  );
}
