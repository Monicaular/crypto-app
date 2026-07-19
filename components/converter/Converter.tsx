"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchCoins } from "@/store/coinsSlice";
import SwapPanel from "./SwapPanel";

export default function Converter() {
  const dispatch = useAppDispatch();
  const { coins } = useAppSelector((state) => state.coins);
  const [fromCoinId, setFromCoinId] = useState("bitcoin");
  const [toCoinId, setToCoinId] = useState("ethereum");

  useEffect(() => {
    if (coins && coins.length === 0) {
      dispatch(fetchCoins());
    } else {
    }
  }, [dispatch, coins]);

  return (
    <div className=" text-white p-4 md:p-8 flex flex-col items-start w-full bg-black">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight">Converter</h1>
        <p className="text-zinc-400 text-sm mt-1 mb-1">
          Swap crypto assets and analyze real-time price rates.
        </p>
      </div>

      <div className="w-full flex flex-col gap-6 items-stretch justify-between">
        <SwapPanel
          fromCoinId={fromCoinId}
          setFromCoinId={setFromCoinId}
          toCoinId={toCoinId}
          setToCoinId={setToCoinId}
        />
        <div className="flex-1 bg-[#1b152d] border border-zinc-800/60 rounded-3xl p-8 flex flex-col justify-center items-center text-center relative z-10">
          <h3 className="text-base font-semibold">Chart to follow</h3>
        </div>
      </div>
    </div>
  );
}
