import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/dashboard">
            <Image src="/TradeFlux-logo-transparent.png" alt="TradeFlux logo" width={100} height={50}/>
        </Link>
    );
};