"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const HomeSubnav = () => {
  const pathname = usePathname();
  return (
    <div className="w-fit bg-[#241e38] flex items-center justify-start gap-1 rounded-xl ml-4">
      <Link 
      href="/"
      className={`px-24 py-2.5 rounded-xl font-semibold text-base transition-all ${
        pathname === "/" ? "bg-[#9810FA] text-white" : "bg-white dark:bg-[#241e38] text-slate-900 dark:text-white hover:bg-[#524a67]"
      }`}
      >Coins</Link>
      <Link 
      href="/converter"
      className={`px-24 py-2.5 rounded-xl font-semibold text-base transition-all ${
        pathname === "/converter" ? "bg-[#9810FA] text-white" : "bg-white dark:bg-[#241e38] text-slate-900 dark:text-white hover: hover:bg-[#524a67]"
      }`}
      >Converter</Link>
    </div>
  );
};
