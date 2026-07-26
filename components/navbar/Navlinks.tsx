import Link from "next/link";
import { HomeIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";

export const Navlinks = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-4 text-lg font-large">
      <Link
        href="/"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-[#6B6BE5] transition-color"
      >
        <HomeIcon className="w-5 h-5" />
        Home
      </Link>
      <Link
        href="/portfolio"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-[#6B6BE5] transition-color"
      >
        <Square3Stack3DIcon className="w-5 h-5" />
        Portfolio
      </Link>
    </div>
  );
};
