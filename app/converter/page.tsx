import { HomeSubnav } from "../components/home/HomeSubnav";

export default function Converter() {
  return (
    <div className="flex min-h-screen flex-col box-border bg-zinc-50 font-sans dark:bg-black">
   <HomeSubnav />
      <main className="flex min-h-screen w-full max-w-3xl  items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
           CONVERTER PAGE
          </h1>
        </div>
      </main>
    </div>
  );
}