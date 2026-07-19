"use client";

import { useAppSelector } from "@/state/hooks";
import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { ArrowLeftRightIcon, ChevronDown } from "lucide-react";

interface SwapPanelProps {
  fromCoinId: string;
  setFromCoinId: Dispatch<SetStateAction<string>>;
  toCoinId: string;
  setToCoinId: Dispatch<SetStateAction<string>>;
}

export default function SwapPanel({
  fromCoinId,
  setFromCoinId,
  toCoinId,
  setToCoinId,
}: SwapPanelProps) {
  const { coins } = useAppSelector((state) => state.coins);

  const [fromAmount, setFromAmount] = useState<string>("1");

  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  const fromCoin = coins.find((coin) => coin.id === fromCoinId);
  const toCoin = coins.find((coin) => coin.id === toCoinId);

  let toAmount = "";
  if (fromCoin && toCoin && fromAmount && !isNaN(Number(fromAmount))) {
    const calculated =
      (Number(fromAmount) * fromCoin.current_price) / toCoin.current_price;
    toAmount =
      calculated < 0.01 ? calculated.toFixed(6) : calculated.toFixed(4);
  }

  const handleSwap = () => {
    const temp = fromCoinId;
    setFromCoinId(toCoinId);
    setToCoinId(temp);
    setFromAmount(toAmount);
  };

  const handleClearFields = () => {
    setFromAmount("0");
    setIsFromOpen(false);
    setIsToOpen(false);
  };

  return (
    <div className="w-full bg-[#241e38] border border-zinc-800/80 rounded-3xl p-6 shadow-xl mb-6 box-border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white">Convert Assets</h2>
        <span className="text-xs bg-purple-950/50 text-purple-300 px-2.5 py-1 rounded-full font-semibold border border-purple-800/20">
          Live Rates
        </span>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-4 w-full relative justify-center">
        <div
          className={`flex-1 min-w-70 order-1 bg-[#1b152d] p-4 rounded-2xl border border-zinc-800/40 ${
            isFromOpen ? "z-30" : "z-10"
          }`}
        >
          <label className="text-xs text-zinc-400">You sell</label>
          <div className="flex justify-between items-center gap-4">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              onFocus={(e) => e.target.value === "0" && setFromAmount("")}
              className="bg-transparent text-xl font-bold text-white focus:outline-none grow min-w-0"
              placeholder="0.00"
            />

            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setIsFromOpen(!isFromOpen);
                  setIsToOpen(false);
                }}
                className="flex items-center bg-[#241e38] border border-zinc-800 hover:border-zinc-700 rounded-xl px-3 py-1.5 text-sm gap-2 font-bold text-white tracking-wide transition"
              >
                {fromCoin?.image && (
                  <div className="relative w-5 h-5">
                    <Image
                      src={fromCoin.image}
                      alt={fromCoin.name}
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>
                )}
                <span className="uppercase">
                  {fromCoin ? fromCoin.symbol : fromCoinId || "Select Currency"}
                  <ChevronDown className="w-4 h-4 text-zinc-400 ml-1" />
                </span>
              </button>

              {/** Dropdown menu portal overlay */}
              {isFromOpen && (
                <div className="absolute right-0 mt-2 w-48 max-h-60 overflow-y-auto bg-[#241e38] border border-zinc-800 rounded-xl shadow-2xl z-50 py-1">
                  {coins.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setFromCoinId(c.id);
                        setIsFromOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-200 hover:bg-[#1b152d] hover:text-white transition text-left"
                    >
                      <div className="relative w-4 h-4">
                        <Image
                          src={c.image}
                          alt={c.name}
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                      <span className="font-semibold uppercase">
                        {c.symbol}
                      </span>
                      <span className="text-xs text-zinc-500 truncate">
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* swap button */}
        <div className="w-full lg:w-auto order-2 shrink-0 z-20 flex items-center justify-center p-1 my-1 lg:my-0 gap-2">
          <button
            onClick={handleClearFields}
            className="bg-[#241e38] border-2 border-zinc-900 text-zinc-400 hover:border-purple-500 font-semibold tracking-wide transition-colors duration-150 px-2.5 py-1 rounded-lg hover:bg-zinc-800/40"
          >
            Clear
          </button>
          <button
            onClick={handleSwap}
            className="bg-[#241e38] border-2 border-zinc-900 hover:border-purple-500 p-2.5 rounded-full text-zinc-400 hover:text-white transition shadow-lg active:scale-95 transform rotate-90 sm:rotate-0"
          >
            <ArrowLeftRightIcon className="w-4 h-4" />
          </button>
        </div>
        {/* Receiving asset field */}
        <div
          className={`flex-1 min-w-70 order-3 bg-[#1b152d] p-4 rounded-2xl border border-zinc-800/40 ${
            isToOpen ? "z-30" : "z-10"
          }`}
        >
          <label className="text-xs text-zinc-400">You Receive</label>
          <div className="flex justify-between items-center gap-2">
            <input
              type="text"
              readOnly
              value={toAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              onFocus={(e) => e.target.value === "0" && setFromAmount("")}
              className="bg-transparent text-xl font-bold text-white focus:outline-none grow min-w-0"
              placeholder="0.00"
            />

            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setIsToOpen(!isToOpen);
                  setIsFromOpen(false);
                }}
                className="flex items-center bg-[#241e38] border border-zinc-800 hover:border-zinc-700 rounded-xl px-3 py-1.5 text-sm gap-2 font-bold text-white tracking-wide transition"
              >
                {toCoin?.image && (
                  <div className="relative w-5 h-5">
                    <Image
                      src={toCoin.image}
                      alt={toCoin.name}
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>
                )}
                <span className="uppercase">
                  {toCoin ? toCoin.symbol : toCoinId || "Select Currency"}
                  <ChevronDown className="w-4 h-4 text-zinc-400 ml-1" />
                </span>
              </button>
              {/*Dropdown menu portal overlay */}
              {isToOpen && (
                <div className="absolute right-0 mt-2 w-48 max-h-60 overflow-y-auto bg-[#241e38] border border-zinc-800 rounded-xl shadow-2xl z-50 py-1">
                  {coins.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setToCoinId(c.id);
                        setIsToOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-200 hover:bg-[#1b152d] hover:text-white transition text-left"
                    >
                      <div className="relative w-4 h-4">
                        <Image
                          src={c.image}
                          alt={c.name}
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                      <span className="font-semibold uppercase">
                        {c.symbol}
                      </span>
                      <span className="text-xs text-zinc-500 truncate">
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
