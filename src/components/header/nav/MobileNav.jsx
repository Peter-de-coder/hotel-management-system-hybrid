import React from "react";
import Logo from "../Logo";
import { images } from "@/utils/images";
import { AiOutlineClose } from "react-icons/ai";
import { navLinks } from "@/utils/navLinks";
import { Link, useLocation } from "react-router-dom";
import MainBtn from "@/components/buttons/MainBtn";
import { useAppContext } from "@/hooks/AppContext";

const MobileNav = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { handleToggleNav, navOpen } = useAppContext();

  return (
    <section className="md:hidden bg-black/80 w-full absolute top-0 h-screen overflow-hidden! z-50">
      <div
        className={`
          bg-white w-[80vw] h-screen rounded-r-lg flex flex-col items-center gap-10 py-10
          transition-transform duration-500 ease-in-out
          ${navOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center w-full px-3 justify-between">
          <Logo src={images.Logo} />
          <button onClick={handleToggleNav}>
            <AiOutlineClose size={25} />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link, key) => (
            <li key={key} className={`font-semibold text-[15px]`} onClick={handleToggleNav}>
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
        <div className="" onClick={handleToggleNav}>
          <Link to={'/booking'}>
            <MainBtn text={"Book Now"} radius={"rounded-md"} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MobileNav;
