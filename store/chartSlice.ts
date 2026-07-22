import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getHistoricalData } from "@/utils/getHistoricalData";

interface MultiChartParams {
  selectedCoins: string[];
  range: string;
  currency: string;
}

interface CoinChartData {
  coinId: string;
  prices: number[];
  volumes: number[];
  timestamps: number[];
}

interface ChartState {
  selectedCoins: string[];
  isCompareMode: boolean;
  coinsData: Record<string, CoinChartData>;
  range: string;
  days: number;
  label: string;
  loading: boolean;
  error: string | null;
}

const initialState: ChartState = {
  selectedCoins: ["bitcoin"],
  isCompareMode: false,
  range: "1d",
  coinsData: {},
  days: 1,
  label: "1D",
  loading: false,
  error: null,
};

export const fetchChartData = createAsyncThunk(
  "chart/fetchChartData",
  async ({ selectedCoins, range, currency }: MultiChartParams) => {
    const results = await Promise.all(
      selectedCoins.map(async (coinId) => {
        const data = await getHistoricalData(coinId, range, currency);
        return {
          coinId,
          prices: data.prices,
          volumes: data.volumes,
          timestamps: data.timestamps,
          days: data.days,
          label: data.label,
        };
      }),
    );
    return results;
  },
);

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setCoinId: (state, action: PayloadAction<string>) => {
      state.selectedCoins = [action.payload];
    },
    toggleCoinSelection: (state, action: PayloadAction<string>) => {
      const coinId = action.payload;

      if (!state.isCompareMode) {
        state.selectedCoins = [coinId];
        return;
      }

      const index = state.selectedCoins.indexOf(coinId);
      if (index !== -1) {
        if (state.selectedCoins.length > 1) {
          state.selectedCoins = [coinId];
        }
      } else {
        if (state.selectedCoins.length < 2) {
          state.selectedCoins.push(coinId);
        } else {
          state.selectedCoins[1] = coinId;
        }
      }
    },

    setCompareMode: (state, action: PayloadAction<boolean>) => {
      state.isCompareMode = action.payload;
      if (!action.payload && state.selectedCoins.length > 1) {
        state.selectedCoins = [state.selectedCoins[0]];
      }
    },

    setRange: (state, action: PayloadAction<string>) => {
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

        const newCoinsData: Record<string, CoinChartData> = {};

        action.payload.forEach((item) => {
          newCoinsData[item.coinId] = {
            coinId: item.coinId,
            prices: item.prices,
            volumes: item.volumes,
            timestamps: item.timestamps,
          };
        });

        state.coinsData = newCoinsData;

        if (action.payload.length > 0) {
          state.days = action.payload[0].days;
          state.label = action.payload[0].label;
        }
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load chart data";
      });
  },
});

export const { setCoinId, toggleCoinSelection, setCompareMode, setRange } =
  chartSlice.actions;
export default chartSlice.reducer;
