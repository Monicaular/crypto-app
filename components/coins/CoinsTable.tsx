"use client";

import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

import { CoinType } from "@/types/coin";
import { formatNumber } from "@/utils/formatNumber";
import { currencySymbols } from "@/utils/currencySymbols";
import { useAppSelector } from "@/state/hooks";
import { calculateCryptoMetrics } from "@/utils/calculateCryptoMetrics";
import {
  randomBgColors,
  randomTrackColors,
  randomTextColors,
} from "@/utils/coinRowColors";
import Sparkline from "./Sparkline";

interface Props {
  coins: CoinType[];
}

export default function CoinsTable({ coins }: Props) {
  const currency = useAppSelector((state) => state.global.currency);
  const symbol = currencySymbols[currency] || "";
  const rowColorNames = [
    "#10b981",
    "#6366f1",
    "#06b6d4",
    "#f59e0b",
    "#f43f5e",
    "#0ea5e9",
    "#8b5cf6",
    "#d946ef",
    "#f97316",
    "#ec4899",
    "#14b8a6",
    "#eab308",
  ];

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b dark:border-zinc-700 text-sm text-zinc-400 border-slate-400">
          <th className="py-2">Name</th>
          <th>Price</th>
          <th>1h%</th>
          <th>24h%</th>
          <th>7d%</th>
          <th>24h Volume/Market Cap</th>
          <th>Circulating/Total Supply</th>
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
          const currentColorName = rowColorNames[index % rowColorNames.length];
          const pricesArray = coin.sparkline_in_7d?.price;
          return (
            <tr
              key={coin.id}
              className="border-b border-slate-200 dark:border-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-800 transition"
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
              <td className="text-zinc-500 text-sm">
                <Sparkline prices={pricesArray} baseColor={currentColorName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
