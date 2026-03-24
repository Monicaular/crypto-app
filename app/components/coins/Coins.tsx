"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchCoins } from "@/store/coinsSlice";
import Image from "next/image";
import { CoinType } from "@/types/coin";

export default function Coins() {
    const dispatch = useAppDispatch();
    const { coins, loading, error} = useAppSelector((state) => state.coins);

    useEffect(() => {
        dispatch(fetchCoins());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    
    return (
       <div className="flex flex-col gap-4">
        {coins.map((coin: CoinType) => (
            <div key={coin.id} className="flex items-center gap-4">
                <Image src={coin.image} alt={coin.name} width={32} height={32}/>
                <span>{coin.name}</span>
                <span>${coin.current_price}</span>
            </div>
        ))}
       </div>
    );
}