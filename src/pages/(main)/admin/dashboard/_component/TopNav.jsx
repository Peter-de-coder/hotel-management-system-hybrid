import React from 'react';
import {IoIosSearch} from "react-icons/io";
import {FaUserAstronaut} from "react-icons/fa";
import {RxHamburgerMenu} from "react-icons/rx";
import {useDashboardContext} from "@/hooks/DashboardContext";

const TopNav = () => {
    const {handleToggleNav} = useDashboardContext()

    return (
        <nav className="top-nav bg-white py-5 px-3 text-sm top-0 sticky">
            <div className="flex justify-between items-center">
                <div className="text-xl md:hidden" onClick={handleToggleNav}>
                    <RxHamburgerMenu/>
                </div>
                <form action="" className="not-md:hidden">
                    <div className=" px-5 py-3 rounded-md w-[35vw] lg:w-[20vw] bg-bgDashboard flex items-center gap-3">
                        <input type="text" className={"w-full focus:outline-0"}
                               placeholder={"Search for rooms"}/>
                        <button className={"cursor-pointer"}>
                            <IoIosSearch className="text-2xl font-light text-aid"/>
                        </button>
                    </div>
                </form>

                <div className="flex items-center gap-2">
                    <FaUserAstronaut className={"text-xl text-main"}/>
                    <h3 className={"text-main"}>Howdy, Admin</h3>
                </div>
            </div>


        </nav>
    );
};

export default TopNav;