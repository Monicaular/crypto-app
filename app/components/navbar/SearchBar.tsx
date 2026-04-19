"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getSearchResults } from "@/utils/getSearchResults";
import Link from "next/link";
import { SearchCoin } from "@/types/searchCoin";

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

    return(
        <div className="relative w-full max-w-md">
            <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search coin..."
        className="w-full px-3 py-2 rounded-md border"
        />

        {results.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 border bg-zinc-900 rounded-md max-h-60 overflow-y-auto">
                {results.map((coin) => (
                    <Link
                    key={coin.id}
                    href={`/coins/${coin.id}`}
                    onClick={clearSearch}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-800 cursor-pointer">
                    <Image
                    src={coin.thumb}
                    alt={coin.name}
                    width={20}
                    height={20}
                    />
                    <span>
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