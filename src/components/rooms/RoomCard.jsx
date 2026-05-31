import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const RoomCard = ({ src, text, heading, price }) => {
  return (
    <div className="group bg-white rounded-2xl border border-black/5 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full w-full max-w-[360px] mx-auto text-left">
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[4/3] w-full">
        <img
          src={src}
          alt={heading}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-main text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md uppercase tracking-wider font-poppins">
          {price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-2">
          {/* Stars */}
          <div className="flex gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
          
          <h3 className="font-bold text-supportDark text-xl font-poppins tracking-tight group-hover:text-main transition-colors duration-300">
            {heading}
          </h3>
          
          <p className="text-[#555] text-sm leading-relaxed font-medium">
            {text}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Link
            to="/rooms"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-main/5 hover:bg-main hover:text-white text-main font-semibold text-sm rounded-xl transition-all duration-300 border border-main/10 hover:border-transparent"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
