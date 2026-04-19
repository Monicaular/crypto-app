import { RootState } from "@/state/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectCoins = (state: RootState) => state.coins.coins;

export const selectCoinsLoading = (state: RootState) => state.coins.loading;

export const selectCoinsError = (state: RootState) => state.coins.error;

export const selectFilteredCoins = createSelector([selectCoins, (_: RootState, query: string) => query], (coins, query) => {
    if (!query) return[];
    const lower = query.toLowerCase();

    return coins.filter((coin) => {
        const name = coin.name.toLowerCase();
        const symbol = coin.symbol.toLowerCase();
        return name.includes(lower) || symbol.includes(lower);
    });

});
