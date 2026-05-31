import React from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";

const TestimonyCard = ({ image, message, name, date = "May 2026" }) => {
  return (
    <div className="group bg-white border border-black/5 hover:border-main/15 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-6 sm:p-8 flex flex-col justify-between w-full max-w-[380px] mx-auto min-h-[340px] relative">
      {/* Decorative quote icon */}
      <div className="absolute top-6 right-6 text-main/5 group-hover:text-main/10 transition-colors duration-300 pointer-events-none">
        <FaQuoteRight size={44} />
      </div>

      <div className="space-y-4">
        {/* Header: Date & Star Rating */}
        <div className="flex justify-between items-center z-10">
          <p className="text-xs text-[#858D9D] font-semibold font-poppins">{date}</p>
          <div className="flex gap-0.5 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={13} />
            ))}
          </div>
        </div>

        {/* Message */}
        <p className="text-[#454545] text-sm sm:text-base leading-relaxed font-medium italic z-10">
          "{message}"
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-black/5 z-10">
        <img
          className="rounded-full object-cover w-11 h-11 border-2 border-main/10 shadow-inner"
          src={image}
          alt={name}
        />
        <div>
          <p className="font-bold text-supportDark text-sm sm:text-base font-poppins leading-tight">{name}</p>
          <p className="text-xs text-[#858D9D] font-semibold mt-0.5">Verified Guest</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonyCard;
