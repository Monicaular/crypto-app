import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGlobalMarketData } from "@/utils/getGlobalMarketData";
import { GlobalMarketDataType } from "@/types/globalMarketDataType";
import { getSupportedCurrencies } from "@/utils/getSupportedCurrencies";

export const fetchGlobalData = createAsyncThunk<GlobalMarketDataType, void>(
  "global/fetchGlobalData",
  async () => {
    return await getGlobalMarketData();
  },
);

export const fetchFiatCurrencies = createAsyncThunk(
  "global/fetchFiatCurrencies",
  async () => {
    return await getSupportedCurrencies();
  }
);

interface GlobalMarketState {
  data: GlobalMarketDataType | null;
  loading: boolean;
  error: string | null;
  currency: string;
  currencies: string[];
}

const initialState: GlobalMarketState = {
  data: null,
  loading: false,
  error: null,
  currency: "usd",
  currencies: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGlobalData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGlobalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load coins";
      })
      .addCase(fetchFiatCurrencies.fulfilled, (state, action) => {
        state.currencies = action.payload;
      });
  },
});
export const { setCurrency } = globalSlice.actions;
export default globalSlice.reducer;
