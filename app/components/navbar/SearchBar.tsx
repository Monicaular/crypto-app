"use client";

import { useAppSelector } from "@/state/hooks";
import { selectFilteredCoins } from "@/store/coinsSelector";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export const SearchBar = () => {

    const [query, setQuery] = useState("");

    const filtered = useAppSelector((state) => selectFilteredCoins(state, query));

    const router = useRouter();

    return(
        <div className="relative w-full max-w-md">
            <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search coin..."
        className="w-full px-3 py-2 rounded-md border"
        />

        {query && filtered.length > 0 && (
            <ul className="absolute left-0 right-0 mt-2 border bg-zinc-900 rounded-md max-h-60 overflow-y-auto">
                {filtered.map((coin) => (
                    <li
                    key={coin.id}
                    onClick={() => {router.push(`/coins/${coin.id}`);}}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-800 cursor-pointer">
                    <Image
                    src={coin.image}
                    alt={coin.name}
                    width={20}
                    height={20}
                    />
                    <span>
                        {coin.name}{" "}
                        <span className="text-zinc-400">({coin.symbol.toUpperCase()})</span>
                    </span>
                    </li>
                ))}
            </ul>
        )}
        </div>
        
    );
};