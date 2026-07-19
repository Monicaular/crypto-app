import Converter from "@/components/converter/Converter";
import { HomeSubnav } from "@/components/navbar/HomeSubnav";

export default function ConverterPage() {
  return (
    <div className="flex min-h-screen flex-col box-border bg-zinc-50 font-sans dark:bg-black">
      <HomeSubnav />
      <Converter />
    </div>
  );
}
