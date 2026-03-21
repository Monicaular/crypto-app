"use client";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../state/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const store = useMemo<AppStore>(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
}