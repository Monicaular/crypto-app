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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen dark:bg-[#110e1b] bg-slate-50 text-white antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <StoreProvider>
          <GlobalMarketBar />
          <ThemeProvider>
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-6">
               <Navbar />
            {children}
            </main>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
