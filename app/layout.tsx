import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Navbar } from "./components/navbar/Navbar";
import GlobalBar from "./components/global/GlobalBar";

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
          <GlobalBar />
          <Navbar />
 
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
