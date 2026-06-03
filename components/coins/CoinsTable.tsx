"use client";

import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

import { CoinType } from "@/types/coin";
import { formatNumber } from "@/utils/formatNumber";
import { currencySymbols } from "@/utils/currencySymbols";
import { useAppSelector } from "@/state/hooks";
import { calculateCryptoMetrics } from "@/utils/calculateCryptoMetrics";

interface Props {
  coins: CoinType[];
}

const randomBgColors = [
  "[&>div]:bg-emerald-500",
  "[&>div]:bg-indigo-500",
  "[&>div]:bg-cyan-500",
  "[&>div]:bg-amber-500",
  "[&>div]:bg-rose-500",
  "[&>div]:bg-sky-500",
  "[&>div]:bg-violet-500",
  "[&>div]:bg-fuchsia-500",
  "[&>div]:bg-orange-500",
  "[&>div]:bg-pink-500",
  "[&>div]:bg-teal-500",
  "[&>div]:bg-yellow-500",
];

const randomTrackColors = [
  "bg-emerald-500/20",
  "bg-indigo-500/20",
  "bg-cyan-500/20",
  "bg-amber-500/20",
  "bg-rose-500/20",
  "bg-sky-500/20",
  "bg-violet-500/20",
  "bg-fuchsia-500/20",
  "bg-orange-500/20",
  "bg-pink-500/20",
  "bg-teal-500/20",
  "bg-yellow-500/20",
];

const randomTextColors = [
  "text-emerald-500",
  "text-indigo-500",
  "text-cyan-500",
  "text-amber-500",
  "text-rose-500",
  "text-sky-500",
  "text-violet-500",
  "text-fuchsia-500",
  "text-orange-500",
  "text-pink-500",
  "text-teal-500",
  "text-yellow-500",
];

export default function CoinsTable({ coins }: Props) {
  const currency = useAppSelector((state) => state.global.currency);
  const symbol = currencySymbols[currency] || "";
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
        {coins.map((coin, index) => {
          const { volumePercentage, supplyPercentage } =
            calculateCryptoMetrics(coin);
          const activeRowColor = randomBgColors[index % randomBgColors.length];
          const activeTrackColor =
            randomTrackColors[index % randomTrackColors.length];
          const activeTextColor =
            randomTextColors[index % randomTextColors.length];
          return (
            <tr
              key={coin.id}
              className="border-b border-zinc-800 hover:bg-zinc-900 transition"
            >
              {/* Coin */}
              <td className="py-3 flex items-center gap-2">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={24}
                  height={24}
                />
                <Link href={`/coins/${coin.id}`} className="hover:underline">
                  {coin.name}
                </Link>
              </td>
              {/* Price */}
              <td>
                {symbol} {coin.current_price.toLocaleString()}
              </td>
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
              {/* Volume/Market Cap*/}
              <td className="py-3 pr-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className={activeTextColor}>
                    {formatNumber(coin.total_volume)}
                  </span>
                  <span className="text-zinc-400">
                    {formatNumber(coin.market_cap)}
                  </span>
                </div>
                <Progress
                  value={volumePercentage}
                  className={`h-1.5 ${activeTrackColor} ${activeRowColor}`}
                />
              </td>
              {/* Supply/Total Supply */}
              <td className="py-3 pr-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className={activeTextColor}>
                    {formatNumber(coin.circulating_supply)}
                  </span>
                  <span className="text-zinc-400">
                    {formatNumber(coin.total_supply)}
                  </span>
                </div>
                <Progress
                  value={supplyPercentage}
                  className={`h-1.5 ${activeTrackColor} ${activeRowColor}`}
                />
              </td>
              {/* Sparkline placeholder */}
              <td className="text-zinc-500 text-sm">Coming soon</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
