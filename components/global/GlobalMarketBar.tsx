"use client";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faArrowRightArrowLeft,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchGlobalData } from "@/store/globalSlice";
import { formatNumber } from "@/utils/formatNumber";
import { formatPercent } from "@/utils/formatPercent";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

export default function GlobalMarketBar() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.global);

  useEffect(() => {
    dispatch(fetchGlobalData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!data) return null;

  const btcPercentage = data?.market_cap_percentage?.btc ?? 0;
  const ethPercentage = data?.market_cap_percentage?.eth ?? 0;

  return (
    <div className="w-full flex items-center justify-center gap-10 px-6 py-3 bg-[#1f1933] text-sm">
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faCoins} />
        <span>Coins: {data?.active_cryptocurrencies}</span>
      </div>
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        <span>Exchanges: {data?.markets}</span>
      </div>
      <div className="flex items-center gap-1.5">
        
        {data?.market_cap_change_percentage_24h_usd !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              data.market_cap_change_percentage_24h_usd >= 0 ? "text-[#06b6d4]" : "text-[#f43f5e]"
            }
          }`}
          >
            <FontAwesomeIcon
              icon={
                data.market_cap_change_percentage_24h_usd >= 0
                  ? faChevronUp
                  : faChevronDown
              }
              className="w-2.5 h-2.5"
            />
          </div>
        )}
        <span>{formatNumber(data?.total_market_cap.usd)}</span>
      </div>
      <div>Vol {formatNumber(data?.total_volume.usd)}</div>
      <div className="flex gap-2">
        <Image
          src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png"
          alt="BTC"
          width={20}
          height={20}
        />
        <span>{formatPercent(btcPercentage)}</span>{" "}
        <div className="w-16 flex items-center">
          <Progress
            value={btcPercentage}
            className="h-1.5 bg-zinc-500 [&>div]:bg-[#f59e0b]"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Image
          src="https://assets.coingecko.com/coins/images/279/small/ethereum.png"
          alt="ETH"
          width={20}
          height={20}
        />
        <span>{formatPercent(ethPercentage)}</span>
        <div className="w-16 flex items-center">
          <Progress
            value={ethPercentage}
            className="h-1.5 bg-zinc-500 [&>div]:bg-[#6366f1]"
          />
        </div>
      </div>
    </div>
  );
}
