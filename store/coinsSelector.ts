import { RootState } from "@/state/store";

export const selectCoins = (state: RootState) => state.coins.coins;

export const selectCoinsLoading = (state: RootState) => state.coins.loading;

export const selectCoinsError = (state: RootState) => state.coins.error;
