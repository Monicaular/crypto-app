"use client";

import Image from "next/image";
import Link from "next/link";

import { CoinType } from "@/types/coin";

interface Props {
  coins: CoinType[];
}

export default function CoinsTable({ coins }: Props) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-zinc-700 text-sm text-zinc-400">
          <th className="py-2">Name</th>
          <th>Price</th>
          <th>1h%</th>
          <th>24h%</th>
          <th>7d%</th>
          <th>24h Volume</th>
          <th>Market Cap</th>
          <th>Circulating/Total</th>
          <th>Last 7d</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr
            key={coin.id}
            className="border-b border-zinc-800 hover:bg-zinc-900 transition"
          >
            {/* Coin */}
            <td className="py-3 flex items-center gap-2">
              <Image src={coin.image} alt={coin.name} width={24} height={24} />
              <Link href={`/coins/${coin.id}`} className="hover:underline">
                {coin.name}
              </Link>
            </td>
            {/* Price */}
            <td>${coin.current_price.toLocaleString()}</td>
            {/* 1h% */}
            <td
              className={
                coin.price_change_percentage_1h_in_currency !== null &&
                coin.price_change_percentage_1h_in_currency > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
            </td>
            {/* 24h % */}
            <td
              className={
                coin.price_change_percentage_24h_in_currency !== null &&
                coin.price_change_percentage_24h_in_currency > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
            </td>
            {/* 7d% */}
            <td
              className={
                coin.price_change_percentage_7d_in_currency !== null &&
                coin.price_change_percentage_7d_in_currency > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
            </td>
            {/* Volume */}
            <td>{coin.total_volume.toLocaleString()}</td>
            {/* Market Cap */}
            <td>{coin.market_cap.toLocaleString()}</td>
            {/* Supply */}
            <td>
              {coin.circulating_supply.toLocaleString()}/{" "}
              {coin.total_supply?.toLocaleString() ?? "-"}
            </td>
            {/* Sparkline placeholder */}
            <td className="text-zinc-500 text-sm">Coming soon</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
