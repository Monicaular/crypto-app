import { Logo } from "./Logo";
import { Navlinks } from "./Navlinks";

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between">
            <Logo />
            <Navlinks />
        </nav>
    );
};