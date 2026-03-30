import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Navbar } from "./components/navbar/Navbar";

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
          <Navbar />
          
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
