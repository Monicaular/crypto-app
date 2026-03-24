"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchGlobalData } from "@/store/globalSlice";

export default function GlobalBar() {
    const dispatch = useAppDispatch();
    const { data, loading} = useAppSelector((state) => state.global);

    useEffect(() => {
        dispatch(fetchGlobalData());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
       <div className="flex gap-4">
        <div>Coins: {data?.active_cryptocurrencies}</div>
        <div>Market Cap: {data?.total_market_cap.usd}</div>
        <div>Exchanges: {data?.markets}</div>
        <div>BTC dominance: {data?.market_cap_percentage.btc}%</div>
        <div>ETH dominance: {data?.market_cap_percentage.eth}%</div>
       </div>
    );
}