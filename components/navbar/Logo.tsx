import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/TradeFlux-logo-transparent.png"
        alt="TradeFlux logo"
        width={100}
        height={50}
        className="brightness-25 dark:brightness-100 transition-all"
      />
    </Link>
  );
};
