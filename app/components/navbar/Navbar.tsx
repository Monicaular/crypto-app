import { Logo } from "./Logo";
import { Navlinks } from "./Navlinks";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between">
            <Logo />
            <Navlinks />
            <SearchBar />
        </nav>
    );
};