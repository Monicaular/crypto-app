import "./globals.css";
import type { Metadata } from "next";

import StoreProvider from "./StoreProvider";
import { Navbar } from "./components/navbar/Navbar";
import GlobalMarketBar from "./components/global/GlobalMarketBar";

export const metadata: Metadata = {
  title: "TradeFlux",
  description: "Track coins, portfolio, and conversions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <GlobalMarketBar />
          <Navbar />
          
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
