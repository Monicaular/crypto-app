import { HomeSubnav } from "./components/home/HomeSubnav";
import Coins from "./components/coins/Coins";

export default function Home(){
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans box-border dark:bg-black">
      <HomeSubnav />
      <main className="flex min-h-screen w-full max-w-3xl  py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Coins
          </h1>
          <Coins />
        </div>
      </main>
    </div>
  );
}
