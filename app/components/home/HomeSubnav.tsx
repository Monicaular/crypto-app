import Link from "next/link";

export const HomeSubnav = () => {
    return(
        <div className="flex gap-4 justify-start">
            <Link href="/dashboard">Coins</Link>
            <Link href="/converter">Converter</Link>
        </div>
    );
};