"use client";
import { HomeSubnav } from "../components/home/HomeSubnav";
import Coins from "../components/coins/Coins";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans box-border dark:bg-black">
  <HomeSubnav />
  <Coins />
      <main className="flex min-h-screen w-full max-w-3xl  py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
     
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row"></div>
      </main>
    </div>
  );
}