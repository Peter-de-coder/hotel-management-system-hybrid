import React from "react";

const stats = [
  { value: "50+", label: "Luxury Rooms & Suites" },
  { value: "15k+", label: "Happy Guests Welcomed" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "5+", label: "Years of Excellence" },
];

const Stats = () => {
  return (
    <section className="xl:px-30 lg:px-20 md:px-8 px-5 py-16 bg-amber-500 text-white relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center justify-center p-4 border-r last:border-r-0 border-white/20 not-lg:border-r-0"
          >
            <span className="text-4xl md:text-6xl font-poppins font-black tracking-tight drop-shadow-md">
              {stat.value}
            </span>
            <span className="text-xs md:text-sm uppercase tracking-widest font-semibold text-white/90">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
