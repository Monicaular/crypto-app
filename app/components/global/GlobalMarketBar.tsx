"use client";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faArrowRightArrowLeft} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchGlobalData } from "@/store/globalSlice";
import Image from "next/image";

function formatNumber(num?: number | null) {
    if (num == null) return"-";
    if (num >= 1_000_000_000_000) return (num / 1_000_000_000_000).toFixed(2) + "T";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    return num.toLocaleString();
}

function formatPercent(num?: number | null) {
    if (num == null) return "-";
    return num.toFixed(0) + "%";
}

export default function GlobalMarketBar() {
    const dispatch = useAppDispatch();
    const { data, loading} = useAppSelector((state) => state.global);

    useEffect(() => {
        dispatch(fetchGlobalData());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
       <div className="w-full flex items-center justify-center gap-10 px-6 py-3 bg-[#1f1933] text-sm" >
        <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faCoins} />
            <span>Coins: {data?.active_cryptocurrencies}</span></div>
        <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            <span>Exchanges: {data?.markets}</span>
        </div>
        <div>Market Cap: {formatNumber(data?.total_market_cap.usd)}</div>
         <div>
        Vol {formatNumber(data?.total_volume.usd)}
      </div>
        <div className="flex gap-2">
            <Image src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" width={20} height={20} />
            <span>{formatPercent(data?.market_cap_percentage.btc)}</span> </div>
        <div className="flex gap-2">
             <Image src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="ETH" width={20} height={20} />
            <span >{formatPercent(data?.market_cap_percentage.eth)}</span>
            </div>
       </div>
    );
}