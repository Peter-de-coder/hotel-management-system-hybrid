import React, { useState } from "react";

const MiniCards = ({ src, srcLight, alt, title }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`
        relative overflow-hidden w-full h-44 rounded-2xl border
        flex items-center flex-col gap-4 justify-center
        cursor-pointer transition-all duration-300 transform
        ${hover 
          ? "bg-main border-transparent shadow-xl -translate-y-1.5 scale-102" 
          : "bg-white/80 border-black/5 shadow-sm hover:shadow-md"
        }
      `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Soft Glow Background on hover */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-0"></div>
      )}

      <div className={`relative z-10 p-4 rounded-full transition-all duration-300 ${hover ? "bg-white/10" : "bg-main/5"}`}>
        <img src={hover ? srcLight : src} alt={alt} width={36} height={36} className="transition-transform duration-300 group-hover:scale-110" />
      </div>
      
      <p
        className={`relative z-10 text-sm md:text-base text-center font-bold font-poppins transition-colors duration-300 ${
          hover ? "text-white" : "text-main"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default MiniCards;
