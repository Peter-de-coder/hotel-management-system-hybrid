import { Link } from "react-router-dom";
import React from "react";

const Hero = () => {
  return (
    <div className="relative h-[60vh] w-full text-center overflow-hidden flex-col flex gap-2 items-center justify-center hero3">
      <h2 className="font-extrabold text-[40px] md:text-[60px] text-white uppercase tracking-wider font-poppins">
        About us
      </h2>
      <div className="flex items-center gap-2 text-white/90 text-sm md:text-base font-semibold bg-black/35 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-lg">
        <Link href={"/"} className="hover:text-amber-400 transition-colors duration-300">
          Home
        </Link>
        <span className="text-white/40">|</span>
        <span className="text-amber-400">About</span>
      </div>
    </div>
  );
};

export default Hero;

