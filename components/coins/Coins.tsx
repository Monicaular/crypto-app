"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import { fetchCoins } from "@/store/coinsSlice";
import CoinsTable from "./CoinsTable";
import MarketLeadersCarousel from "./MarketLeadersCarousel";
import PriceChart from "./chart/PriceChart";
import VolumeChart from "./chart/VolumeChart";
import RangeSelector from "./chart/RangeSelector";
import { fetchChartData } from "@/store/chartSlice";
import CompareToggleSwitch from "./chart/CompareToggleSwitch";

export default function Coins() {
  const dispatch = useAppDispatch();
  const { coins, loading, error } = useAppSelector((state) => state.coins);
  const { selectedCoins, range } = useAppSelector((state) => state.chart);
  const currency = useAppSelector((state) => state.global.currency);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch, currency]);

  useEffect(() => {
    if (coins.length > 0 && selectedCoins.length > 0) {
      dispatch(fetchChartData({ selectedCoins, range, currency }));
    }
  }, [dispatch, selectedCoins, range, currency, coins.length]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-end items center py-4">
        <CompareToggleSwitch />
      </div>

      <MarketLeadersCarousel coins={coins} />
      <div className="flex gap-4">
        <PriceChart />
        <VolumeChart />
      </div>
      <RangeSelector />
      <CoinsTable coins={coins} />
    </div>
  );
}
