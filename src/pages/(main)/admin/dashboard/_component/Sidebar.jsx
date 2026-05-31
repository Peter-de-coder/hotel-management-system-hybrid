import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { images } from "@/utils/images";
import { links } from "../links";
import { GrLogout } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { useDashboardContext } from "@/hooks/DashboardContext";
import { AuthService } from "../../services/authService";
import { AuthContext } from "@/hooks/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const { dispatch } = useContext(AuthContext);
  const { navOpen, handleToggleNav } = useDashboardContext();

  const handleLogout = () => {
    AuthService.logoutUser(dispatch);
  };

  return (
    <aside className={`bg-white ${!navOpen && "not-sm:hidden"} h-screen `}>
      <nav className="flex flex-col justify-between h-screen w-full overflow-auto">
        <div className="w-full">
          <div className="flex justify-between items-center bg-white py-5 sticky top-0 z-10 px-5">
            <div className="flex items-center">
              <Link to="/admin/dashboard">
                <img src={images.LogoBrown}
                  alt="Hybrid hotel & suite logo"
                  width={55}
                  height={55}
                  loading="eager"
                  className="object-cover object-center "
                />
              </Link>
              <h4
                className={"not-sm:hidden md:text-xl text-main font-semibold"}
              >
                <span>Hybrid Hotels </span>
                <span>& Suites</span>
              </h4>
            </div>
            <button className={"not-sm:block hidden"} onClick={handleToggleNav}>
              <IoMdClose className="text-2xl" />
            </button>
          </div>
          <ul className="flex flex-col sgap-10 text-sm md:my-10 ">
            {links.map((link, i) => {
              const isActive = pathName === link.link;

              return (
                <li key={i} className={"py-6"}>
                  <Link
                    to={link.link}
                    className={`flex gap-3 items-center text-gray-600 px-5 relative transition-all duration-700 ${isActive && " bg-bgDashboard py-4"}`}
                  >
                    {isActive && (
                      <>
                        {/* Top Inverted Corner */}
                        <div
                          className="absolute -top-5 right-0 w-3.75 h-5 bg-bgDashboard
                      before:content-[''] before:absolute before:inset-0 before:bg-white before:rounded-br-[20px]"
                        ></div>

                        {/* Bottom Inverted Corner */}
                        <div
                          className="absolute -bottom-5 right-0 w-3.75 h-5 bg-bgDashboard
                      before:content-[''] before:absolute before:inset-0 before:bg-white before:rounded-tr-[20px]"
                        ></div>
                      </>
                    )}
                    <span>{isActive ? link.iconCurrent : link.icon}</span>
                    <span
                      className={`${isActive && "text-main font-semibold"}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <ul
          className={"px-5 flex items-center text-sm gap-3 py-6 cursor-pointer"}
          onClick={handleLogout}
        >
          <GrLogout className={"text-main text-xl"} />
          <li>Logout</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
