import CurrencySelector from "../global/CurrencySelector";
import { Logo } from "./Logo";
import { Navlinks } from "./Navlinks";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "../global/Theme-Toggle";

export const Navbar = () => {
  return (
    <nav className="w-full bg-transparent p-3 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
        <Logo />
        <Navlinks />
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <SearchBar />
        <CurrencySelector />
        <ThemeToggle />
      </div>
    </nav>
  );
};
