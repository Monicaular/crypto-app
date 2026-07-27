"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getSearchResults } from "@/utils/getSearchResults";
import Link from "next/link";
import { SearchCoin } from "@/types/searchCoin";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchCoin[]>([]);

  function clearSearch() {
    setQuery("");
    setResults([]);
  }

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }
      const data = await getSearchResults(query);
      setResults(data);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-full sm:w-64 md:w-80">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <Search className="h-5 w-5"/>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search coin..."
        className="w-full px-3 pl-10 py-3 text-lg rounded-xl bg-[#18172F] border border-zinc-700/60 placeholder-white text-white focus:outline-white transition-colors"
        suppressHydrationWarning
      />

      {results.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-2 border bg-[#181424] rounded-xl shadow-2xl max-h-60 overflow-y-auto divide-y divide-zinc-800/50">
          {results.map((coin) => (
            <Link
              key={coin.id}
              href={`/coins/${coin.id}`}
              onClick={clearSearch}
              className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-800 cursor-pointer"
            >
              <Image src={coin.thumb} alt={coin.name} width={20} height={20} />
              <span className="font-medium text-white">
                {coin.name}{" "}
                <span className="text-zinc-400">({coin.symbol})</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
