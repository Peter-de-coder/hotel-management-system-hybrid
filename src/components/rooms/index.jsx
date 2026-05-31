import { images } from "@/utils/images";
import React from "react";
import RoomCard from "./RoomCard";

const Rooms = () => {
  return (
    <section className="relative w-full">
      <div className="rooms py-16 sm:py-24 relative">
        {/* Soft overlay blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#01053d]/70 to-[#464a7c]/65 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-col gap-3 justify-center items-center mb-12 sm:mb-16">
            <span className="text-white/80 font-semibold tracking-widest text-xs sm:text-sm uppercase block font-poppins">
              Stay in Elegance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-poppins">
              Our Luxurious Rooms
            </h2>
            <div className="bg-white/90 w-16 h-1 mt-2 rounded-full"></div>
            <p className="text-white/90 font-medium text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
              Every detail in our rooms is custom designed to maximize your comfort, peace of mind, and overall relaxation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">
            <RoomCard
              heading="Deluxe Executive Suite"
              src={images.Room1}
              price="₦35,000 / Night"
              text="Featuring a plush queen-size bed, private workspace, high-speed Wi-Fi, modern media setup, and complimentary breakfast."
            />
            <RoomCard
              heading="Harmony Superior Room"
              src={images.Room2}
              price="₦50,000 / Night"
              text="Spacious and comfortable king bed layout, premium bath products, ambient lighting control, fireplace, and private balcony."
            />
            <RoomCard
              heading="Presidential Royal Suite"
              src={images.Room3}
              price="₦95,000 / Night"
              text="Our ultimate luxury suite containing separate lounge, panoramic skyline view, smart jacuzzi, 24/7 private service, and bar."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
