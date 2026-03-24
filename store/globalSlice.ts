import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGlobalData } from "@/utils/getGlobalData";
import { GlobalDataType } from "@/types/globalDataType";

export const fetchGlobalData = createAsyncThunk("global/fetchGlobalData", async () => {
  return await getGlobalData();
});

interface GlobalState {
  data: GlobalDataType | null;
  loading: boolean;
  error: string | null;
}

const initialState: GlobalState = {
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
      .addCase(fetchGlobalData.rejected, (state) => {
        state.loading = false;
        state.error = "Faildes to load coins";
      });
  },
});
 export default globalSlice.reducer;