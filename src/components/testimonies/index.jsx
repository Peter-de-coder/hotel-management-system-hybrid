import React from "react";
import TestimonyCard from "./TestimonyCard";
import { images } from "@/utils/images";

const Testimonies = () => {
  return (
    <section className="relative overflow-hidden my-16 xl:px-30 lg:px-20 md:px-8 px-5 bg-background">
      {/* Decorative Glow Blob for Color Blend */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-main/5 to-purple-400/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-main font-semibold tracking-widest text-xs sm:text-sm uppercase block mb-3 font-poppins">
            Guest Stories
          </span>
          <h2 className="text-supportDark font-bold text-3xl sm:text-4xl tracking-tight font-poppins">
            What Our Guests Say
          </h2>
          <div className="w-16 h-1 bg-main mx-auto mt-4 rounded-full"></div>
          <p className="text-small text-sm sm:text-base font-medium font-poppins mt-4 leading-relaxed">
            Read real feedback from our verified guests who stayed at Hybrid Hotel & Suites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">
          <TestimonyCard
            image={images.Avatar1}
            message="The service here was outstanding from the very beginning. Every request was handled quickly and professionally. The atmosphere was warm, the food was great, and the staff truly cared about making our stay enjoyable."
            name="Sarah Jenkins"
            date="14 Apr. 2026"
          />

          <TestimonyCard
            image={images.Avatar3}
            message="From the moment we arrived, the hospitality was simply top-notch. The staff anticipated our needs without us even asking. Everything felt organized, welcoming, and peaceful — the perfect place to unwind."
            name="Sophia Martinez"
            date="28 Mar. 2026"
          />

          <TestimonyCard
            image={images.Avatar2}
            message="I was honestly impressed by how consistent the service was throughout our stay. Everyone was friendly and professional. It's rare to find a place that balances comfort, quality, and real care this well."
            name="Michael Adebayo"
            date="05 Jan. 2026"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonies;
