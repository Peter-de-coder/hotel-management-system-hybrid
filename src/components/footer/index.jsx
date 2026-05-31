import Logo from "../header/Logo";
import { images } from "@/utils/images";
import { navLinks } from "@/utils/navLinks";
import { Link, useLocation } from "react-router-dom";
import MainBtn from "../buttons/MainBtn";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BiLocationPlus } from "react-icons/bi";

const Footer = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const date = new Date().getFullYear();

  return (
    <footer className="bg-main w-full h-full xl:px-30 lg:px-20 md:px-8 px-5 py-5">
      <div className="grid lg:grid-cols-4 grid-cols-1 items-center lg:h-[50vh] lg:gap-7 gap-10 md:place-items-center">
        <div className=" lg:w-69.25 xl:w-89.25 flex flex-col gap-7">
          <div className="flex items-center">
            <Logo src={images.LogoLight} />
            <h2 className="font-dancing font-semibold text-[20px] md:text-[30px] text-white">
              Hybrid Hotel & Suites
            </h2>
          </div>
          <p className="font-bold text-[12px] text-white text-justify">
            The service at the Hybrid hotel & suites was exceptional. There was
            absolutely no issue that was not addressed timely and with
            satisfactory results. We were particulary impressed with how the
            hotel staff anticipated our needs (periodically coming by the Board
            Room to check with us)
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 not-lg:w-full">
          <h6 className="text-white font-bold text-[15px]">Quick Links</h6>
          <ul className="flex not-lg:flex-row gap-2 flex-col">
            {navLinks.map((link, key) => (
              <li key={key} className={`font-semibold text-[15px]`}>
                <Link
                  to={link.path}
                  className={` ${
                    pathname === link.path
                      ? "text-white font-extrabold"
                      : "text-white font-bold"
                  } text-[12px]`}
                >
                  {link.linkName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-7 not-lg:w-full ">
          <h6 className="text-white font-bold text-[15px]">Newsletter</h6>
          <p className=" text-white text-[12px] font-bold lg:w-[80%]">
            Kindly subscribe to our newsletter to get latest deals on our rooms
            and vacation discount.
          </p>

          <form className="w-full">
            <div className="bg-white py-2 px-3 rounded-md flex w-full">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full text-sm  focus:outline-0"
              />
              <MainBtn text={"Subscribe"} radius={"rounded-sm"} />
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <h6 className="text-white font-bold text-[15px]">
            For More Information
          </h6>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <AiOutlineMail className="text-white text-[20px]" />
              <a href="mailto:hybridhotelandsuites@gmail.com">
                <p className=" text-white text-[12px] font-bold w-[80%]">
                  hybridhotelandsuites@gmail.com
                </p>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlinePhone className="text-white text-[20px]" />
              <a href="tel:08068488469">
                <p className=" text-white text-[12px] font-bold ">
                  0806 8488 469
                </p>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <BiLocationPlus className="text-white text-[20px]" />

              <p className=" text-white text-[12px] font-bold ">
                Elele, Uzairue, Auchi – Abuja Express Road, Etsako West LGA, Edo
                State
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 text-center">
        <h2 className="font-dancing font-semibold text-[20px] py-5 tracking-wider md:text-[20px] text-white">
          Hybrid Hotel & Suites
        </h2>
        <div className="flex text-white justify-center text-sm gap-5">
          <p> Copyright © {date} . All rights reserved.</p>
          <div className="bg-white px-0.5"></div>
          <p>Designed & Developed by Imperium</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
