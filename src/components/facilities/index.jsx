import React from "react";
import MiniCards from "../MiniCards";
import { IconLight, Icons } from "@/utils/icons";

const Facilities = () => {
  return (
    <section className="relative overflow-hidden xl:px-30 lg:px-20 md:px-8 px-5 py-16 bg-[#fafafa]">
      {/* Decorative Glow Blob for Color Blend */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-main/5 to-blue-400/5 blur-[140px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-main font-semibold tracking-widest text-xs sm:text-sm uppercase block mb-3 font-poppins">
            Designed for Excellence
          </span>
          <h2 className="text-supportDark font-bold text-3xl sm:text-4xl tracking-tight font-poppins">
            Our Premium Facilities
          </h2>
          <div className="w-16 h-1 bg-main mx-auto mt-4 rounded-full"></div>
          <p className="text-small text-sm sm:text-base font-medium font-poppins mt-4 leading-relaxed">
            We offer modern, world-class (5-star) hotel facilities tailored to make your stay relaxing, enjoyable, and completely convenient.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <MiniCards
            alt="Swimming Pool"
            src={Icons.Pool}
            title="Swimming Pool"
            srcLight={IconLight.Pool}
          />
          <MiniCards
            alt="Wifi"
            src={Icons.Wifi}
            title="High-Speed WIFI"
            srcLight={IconLight.Wifi}
          />
          <MiniCards
            alt="Breakfast"
            src={Icons.Breakfast}
            title="Complimentary Breakfast"
            srcLight={IconLight.Breakfast}
          />
          <MiniCards
            alt="Gym"
            src={Icons.Gym}
            title="Fitness Center"
            srcLight={IconLight.Gym}
          />
          <MiniCards
            alt="Game"
            src={Icons.Game}
            title="Game Lounge"
            srcLight={IconLight.Game}
          />
          <MiniCards
            alt="Light"
            src={Icons.Light}
            title="24/7 Power Supply"
            srcLight={IconLight.Light}
          />
          <MiniCards
            alt="Laundry"
            src={Icons.Laundry}
            title="Laundry Service"
            srcLight={IconLight.Laundry}
          />
          <MiniCards
            alt="Parking Space"
            src={Icons.Park}
            title="Secure Parking"
            srcLight={IconLight.Park}
          />
        </div>
      </div>
    </section>
  );
};

export default Facilities;
