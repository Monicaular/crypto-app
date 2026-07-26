import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import StoreProvider from "./StoreProvider";
import { Navbar } from "@/components/navbar/Navbar";
import GlobalMarketBar from "@/components/global/GlobalMarketBar";

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
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body>
        <StoreProvider>
          <GlobalMarketBar />
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
