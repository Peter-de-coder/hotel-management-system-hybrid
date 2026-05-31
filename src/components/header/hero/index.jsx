import MainBtn from "@/components/buttons/MainBtn";
import { images } from "@/utils/images";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const Hero = () => {
  const [clicked, setClicked] = useState(false);
  const handleClickedVideo = () => {
    setClicked(!clicked);
  };

  const slideImages = [images.Hero, images.Hero2, images.Hero4];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary50/30 via-white to-background w-full min-h-[600px] lg:h-[80vh] flex items-center xl:px-30 lg:px-20 md:px-8 px-5 py-12 md:py-0">
      {/* Decorative Glow Blobs for Color Blend */}
      <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] bg-gradient-to-tr from-main/15 to-blue-400/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-gradient-to-tr from-indigo-500/5 to-purple-400/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        {/* Left Text Column */}
        <div className="text w-full flex flex-col lg:gap-6 gap-4 animate-fadeIn">
          <span className="text-main font-semibold tracking-widest text-xs uppercase block font-poppins">
            Welcome to Paradise
          </span>
          <h2 className="font-dancing font-semibold text-[32px] md:text-[45px] text-main leading-none">
            Hybrid Hotel & Suites
          </h2>
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] text-supportDark leading-tight font-poppins">
            Hotel for every moment, filled with{" "}
            <span className="font-dancing text-[1.4em] text-main font-normal">E</span>motion.
          </h1>
          <p className="text-base text-small max-w-md leading-relaxed">
            Every moment feels like the first time at Hybrid Hotel & Suites. Step into our world of comfort, custom designs, and exceptional hospitality.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Link to="/booking">
              <MainBtn text={"Book Now"} radius={"rounded-full"} className="shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" />
            </Link>
            <div className="flex items-center gap-3 group cursor-pointer" onClick={handleClickedVideo}>
              <div className="bg-main hover:bg-main/90 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105">
                {clicked ? <FaPause size={16} /> : <FaPlay size={16} className="ml-0.5" />}
              </div>
              <p className="text-supportDark text-sm sm:text-base font-semibold tracking-wide">
                {clicked ? "Pause Video" : "Take a tour"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Media Column */}
        <div className="flex justify-center md:justify-end items-center w-full z-10">
          <div className="relative w-full max-w-[650px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 bg-white p-2 border border-black/5">
            {clicked ? (
              <iframe
                src="https://www.youtube.com/embed/mTRvuEoCVL0?autoplay=1"
                className="w-full h-full rounded-xl object-cover"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img 
                  src={slideImages[index]} 
                  alt="Hybrid Hotel & Suites" 
                  className="w-full h-full object-cover rounded-xl transition-all duration-1000 ease-in-out transform hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
