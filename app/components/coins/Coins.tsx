"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import { fetchCoins } from "@/store/coinsSlice";
import CoinsTable from "./CoinsTable";

export default function Coins() {
  const dispatch = useAppDispatch();
  const { coins, loading, error } = useAppSelector((state) => state.coins);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <CoinsTable coins={coins} />
    </div>
  );
}
