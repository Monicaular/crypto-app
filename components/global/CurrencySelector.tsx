"use client";

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useState, useRef, useEffect } from "react";
import {
  fetchGlobalData,
  setCurrency,
  fetchFiatCurrencies
} from "@/store/globalSlice";
import { fetchCoins } from "@/store/coinsSlice";

export default function CurrencySelector() {
  const dispatch = useAppDispatch();

  const currencies = useAppSelector((state) => state.global.currencies);
  const current = useAppSelector((state) => state.global.currency);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      dispatch(fetchFiatCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (!search) return;
    const timeout = setTimeout(() => setSearch(""), 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    const char = e.key.toLowerCase();
    if (!/^[a-z]$/.test(char)) return;

    const newSearch = search + char;
    setSearch(newSearch);

    const match = currencies.find((c) => c.startsWith(newSearch));
    if (!match) return;

    const index = currencies.indexOf(match);
    const item = listRef.current?.children[index] as HTMLElement;

    item?.scrollIntoView({ block: "nearest" });
  };

  const handleSelect = (cur: string) => {
    dispatch(setCurrency(cur));
    dispatch(fetchGlobalData());
    dispatch(fetchCoins()); 
    setOpen(false);
  };

  return (
    <div className="relative" onKeyDown={handleKeyDown} tabIndex={0}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 hover:bg-[#3a3250] rounded text-left"
      >
        {current.toUpperCase()}
      </button>
      {open && (
        <div
        ref={listRef}
        className="mt-2 bg-[#2a2340] rounded shadow-lg p-2 flex flex-col text-sm max-h-40 overflow-y-auto z-50"
        >
            {currencies.map((cur) => (
        <button
          key={cur}
          onClick={() => handleSelect(cur)}
          className="px-3 py-1 hover:bg-[#3a3250] rounded text-left"
        >
          {cur.toUpperCase()}
        </button>
      ))}
        </div>
      )}
      
    </div>
  );
}
