import CurrencySelector from "../global/CurrencySelector";
import { Logo } from "./Logo";
import { Navlinks } from "./Navlinks";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "../global/Theme-Toggle";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <Logo />
      <Navlinks />
      <SearchBar />
      <CurrencySelector />
      <ThemeToggle />
    </nav>
  );
};
