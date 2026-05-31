import { images } from "@/utils/images";
import { navLinks } from "@/utils/navLinks";
import { Link, useLocation } from "react-router-dom";
import MainBtn from "../../buttons/MainBtn";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../Logo";
import MobileNav from "./MobileNav";
import { useAppContext } from "@/hooks/AppContext";

const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { handleToggleNav, navOpen } = useAppContext();

  return (
    <div className="z-100 sticky top-0 ">
      <nav className="w-full md:h-25 h-20 bg-background flex justify-between items-center rounded-b-md ml:px-30 lg:px-20 md:px-8 px-5">
        <Logo src={images.Logo} />
        <ul className="flex items-center gap-12 not-md:hidden">
          {navLinks.map((link, key) => (
            <li key={key} className={`font-semibold text-[15px]`}>
              <Link
                to={link.path}
                className={` ${
                  pathname === link.path
                    ? "text-main font-extrabold"
                    : "text-black"
                }`}
              >
                {link.linkName}
              </Link>
            </li>
          ))}
        </ul>
        <div className=" not-md:hidden">
          <Link to={"/booking"}>
            <MainBtn text={"Book Now"} radius={"rounded-md"} />
          </Link>
        </div>
        <button className="md:hidden" onClick={handleToggleNav}>
          <RxHamburgerMenu className="text-main" size={30} />
        </button>
      </nav>
      {navOpen ? <MobileNav /> : null}
    </div>
  );
};

export default Nav;
