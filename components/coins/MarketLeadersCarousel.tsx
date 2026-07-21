"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { CoinType } from "@/types/coin";
import { currencySymbols } from "@/utils/currencySymbols";
import { useAppSelector } from "@/state/hooks";
import { formatNumber } from "@/utils/formatNumber";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface MarketLeadersProps {
  coins: CoinType[];
}

export default function MarketLeadersCarousel({ coins }: MarketLeadersProps) {
  const currency = useAppSelector((state) => state.global.currency);
  const symbol = currencySymbols[currency] || "";

  if (!coins || coins.length === 0) return null;

  return (
    <div className="w-full mb-8 relative">
      <Carousel
        opts={{ align: "start", loop: true, dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {coins.map((coin) => {
            const change24h = coin.price_change_percentage_24h_in_currency ?? 0;
            const isPositive = change24h > 0;

            return (
              <CarouselItem
                key={coin.id}
                className="basis-full sm:basis-1/3 lg:basis-1/6 pl-3"
              >
                <div className="bg-[#241e38] flex items-center p-3 gap-3 border border-zinc-800 rounded-xl">
                  <div className="relative w-8 h-8 shrink-0">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex w-full overflow-hidden">
                      <h3 className="font-semibold truncate text-white group-hover:text-zinc-200 leading-tight">
                        {coin.name}{" "}
                        <span className="uppercase">({coin.symbol})</span>
                      </h3>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="text-base font-bold text-white tracking-tight px-1">
                        {symbol} {formatNumber(coin.current_price)}
                      </div>

                      <div
                        className={`flex items-center gap-0.5 font-semibold ${isPositive ? "text-[#10b981]" : "text-red-500"}`}
                      >
                        <FontAwesomeIcon
                          icon={isPositive ? faCaretUp : faCaretDown}
                          className="w-2.5 h-2.5"
                        />
                        <span>{Math.abs(change24h).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
