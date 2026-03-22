import Link from "next/link";
import { HomeIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";

export const Navlinks = () => {
  return (
    <div className="flex gap-4">
      <div>
        <Link href="/" className="flex items-center gap-1">
          <HomeIcon className="w-5 h-5" />
          Home
        </Link>
      </div>
      <Link href="/portfolio" className="flex items-center gap-1">
        <Square3Stack3DIcon className="w-5 h-5" />
        Portfolio
      </Link>
      
    </div>
  );
};
