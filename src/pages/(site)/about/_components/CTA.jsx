import React from "react";
import { Link } from "react-router-dom";
import MainBtn from "@/components/buttons/MainBtn";

const CTA = () => {
  return (
    <section className="xl:px-30 lg:px-20 md:px-8 px-5 py-20 bg-background text-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-main/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-6 items-center">
        <span className="font-dancing text-3xl text-amber-500 font-semibold">
          Your Next Escape
        </span>
        <h2 className="text-3xl md:text-5xl font-poppins font-bold text-main leading-tight">
          Ready to Experience Comfort &amp; Luxury?
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Book your reservation today. Whether it's a weekend getaway, a family vacation, or a business trip, we have the perfect room waiting for you.
        </p>

        <div className="mt-4 flex justify-center">
          <Link href="/rooms">
            <MainBtn text="Explore Our Rooms" radius="rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
