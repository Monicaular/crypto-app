"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Image from "next/image";
import Link from "next/link";

import { fetchCoins } from "@/store/coinsSlice";
import { CoinType } from "@/types/coin";
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
      {coins.map((coin: CoinType) => (
        <Link href={`/coins/${coin.id}`} key={coin.id}>
          <div key={coin.id} className="flex items-center gap-4">
            <Image src={coin.image} alt={coin.name} width={32} height={32} />
            <span>{coin.name}</span>
            <span>${coin.current_price}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
