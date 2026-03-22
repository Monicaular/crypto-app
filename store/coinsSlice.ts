import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCoinsList } from "@/utils/getCoinsList";
import { CoinType } from "@/types/coin";

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  return await getCoinsList();
});

interface CoinsState {
  coins: CoinType[];
  loading: boolean;
  error: string | null;
}

const initialState: CoinsState = {
  coins: [],
  loading: false,
  error: null,
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.loading = false;
        state.error = "Faildes to load coins";
      });
  },
});
 export default coinsSlice.reducer;