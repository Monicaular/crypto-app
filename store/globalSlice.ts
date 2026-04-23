import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGlobalMarketData } from "@/utils/getGlobalMarketData";
import { GlobalMarketDataType } from "@/types/globalMarketDataType";

export const fetchGlobalData = createAsyncThunk<GlobalMarketDataType, void>("global/fetchGlobalData", async () => {
  return await getGlobalMarketData();
});

interface GlobalMarketState {
  data: GlobalMarketDataType | null;
  loading: boolean;
  error: string | null;
}

const initialState: GlobalMarketState = {
  data: null,
  loading: false,
  error: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
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
      });
  },
});
 export default globalSlice.reducer;