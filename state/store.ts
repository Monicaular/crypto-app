import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "@/store/coinsSlice";
import globalReducer from "@/store/globalSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coins: coinsReducer,
      global: globalReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];