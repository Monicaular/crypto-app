import { Logo } from "./Logo";
import { Navlinks } from "./Navlinks";

export const Navbar = () => {
    return (
        <div className="flex items-center justify-between">
            <Logo />
            <Navlinks />
        </div>
    );
};