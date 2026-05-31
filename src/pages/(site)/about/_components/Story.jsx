import React from "react";

import { images } from "@/utils/images";

const Story = () => {
  return (
    <section className="xl:px-30 lg:px-20 md:px-8 px-5 py-20 bg-background overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-6" data-aos="fade-right">
          <div className="flex flex-col gap-2">
            <span className="font-dancing text-3xl text-amber-500 font-semibold tracking-wide">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-main leading-tight">
              A Legacy of Comfort & Elegant Hospitality
            </h2>
          </div>
          
          <div className="w-20 h-1.5 bg-amber-500 rounded-full"></div>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
            Established with a vision to redefine luxury and hospitality, <strong>Hybrid Hotel & Suites</strong> bridges the gap between state-of-the-art facilities and a warm, personalized guest experience. Located along the prominent Abuja Express Road in Edo State, our sanctuary offers travelers, families, and business professionals a pristine environment to unwind, connect, and excel.
          </p>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
            Over the years, we have grown from a modest guest lodging into a premier boutique destination. Our commitment remains unwavering: providing immaculate lodging, exquisite cuisine, and top-tier amenities that ensure your stay feels less like a hotel and more like home.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="border-l-4 border-main pl-4 py-2">
              <h4 className="font-poppins font-bold text-xl text-main">Our Mission</h4>
              <p className="text-xs text-gray-500 mt-1">
                To deliver authentic hospitality by making a difference in the lives of the people we touch every day.
              </p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2">
              <h4 className="font-poppins font-bold text-xl text-amber-500">Our Vision</h4>
              <p className="text-xs text-gray-500 mt-1">
                To be the preferred choice for business and leisure travelers seeking refined, secure comfort.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Image Gallery Grid */}
        <div className="relative flex justify-center lg:justify-end" data-aos="fade-left">
          <div className="relative w-full max-w-[500px] h-[450px] md:h-[500px]">
            {/* Main large image */}
            <div className="absolute top-0 left-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 z-10 border-4 border-white">
              <img src={images.Hero3}
                alt="Hybrid Hotel Lobby"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Secondary smaller overlay image */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 z-20 border-4 border-white">
              <img src={images.Hero}
                alt="Hybrid Hotel Luxury Suite"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Decorative colored badge */}
            <div className="absolute bottom-12 left-6 bg-main text-white px-6 py-4 rounded-xl shadow-lg z-30 flex flex-col items-center justify-center border border-white/10 hidden sm:flex">
              <span className="font-dancing text-2xl text-amber-400 font-bold">5+ Years</span>
              <span className="text-[10px] uppercase tracking-widest font-semibold mt-1">Of Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
