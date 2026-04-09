import { getCoinById } from "@/utils/getCoinById";
import Image from "next/image";

export default async function Coin({ params }: { params: Promise<{coinId: string}>}) {
  const { coinId } = await params;
  const coin = await getCoinById(coinId);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {coin.name} ({coin.symbol.toUpperCase()})
          </h1>
          <Image src={coin.image.large} alt={coin.name} width={20} height={20}/>
          <div>Id: {coinId}</div>
          <div>{coin.description.en}</div>
          <h3>Links: </h3>
          <div>{coin.links.homepage}</div>
          <div className="flex flex-col">{coin.links.blockchain_site.map((link) => (
            <a 
            key={link}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            >{link}</a>
          )) }</div>
          <p>ATH: ${coin.market_data.ath.usd}</p>
          <p>{coin.market_data.ath_date.usd}</p>
          <p>ATL: ${coin.market_data.atl.usd}</p>
          <p>{coin.market_data.atl_date.usd}</p>
          <p>Market Cap: ${coin.market_data.market_cap.usd}</p>
          <p>Fully Diluted Valuation: ${coin.market_data.fully_diluted_valuation.usd}</p>
          <p>Circulating Supply: {coin.market_data.circulating_supply}</p>
          <p>Max Supply: {coin.market_data.max_supply}</p>
        </div>
      </main>
    </div>
  );
}
