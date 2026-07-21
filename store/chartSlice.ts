import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHistoricalData } from "@/utils/getHistoricalData";

interface ChartParams {
  coinId: string;
  range: string;
  currency: string;
}

interface ChartState {
  coinId: string;
  range: string;
  priceData: number[];
  volumeData: number[];
  timestamps: number[];
  days: number;
  label: string;
  loading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  coinId: "bitcoin",
  range: "1d",
  priceData: [],
  volumeData: [],
  timestamps: [],
  days: 1,
  label: "1D",
  loading: false,
  error: null,
};

export const fetchChartData = createAsyncThunk(
  "chart/fetchChartData",
  async ({ coinId, range, currency }: ChartParams) => {
    return await getHistoricalData(coinId, range, currency);
  },
);

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setCoinId: (state, action) => {
      state.coinId = action.payload;
    },
    setRange: (state, action) => {
      state.range = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.priceData = action.payload.prices;
        state.volumeData = action.payload.volumes;
        state.timestamps = action.payload.timestamps;
        state.range = action.payload.range;
        state.days = action.payload.days;
        state.label = action.payload.label;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load chart data";
      });
  },
});

export const { setCoinId, setRange } = chartSlice.actions;
export default chartSlice.reducer;
