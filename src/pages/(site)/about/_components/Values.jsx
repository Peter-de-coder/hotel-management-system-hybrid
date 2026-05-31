import React from "react";
import { FaBed, FaHandshake, FaShieldAlt, FaAward } from "react-icons/fa";

const coreValues = [
  {
    icon: <FaBed className="text-4xl text-amber-500" />,
    title: "Uncompromising Comfort",
    description: "Every room and suite is designed to serve peaceful sanctuary, complete with luxurious bedding, serene lighting, and premium climate control.",
  },
  {
    icon: <FaHandshake className="text-4xl text-amber-500" />,
    title: "Dedicated Service",
    description: "Our hospitality team goes above and beyond, providing proactive assistance and anticipating your needs with warmth and professionalism.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-amber-500" />,
    title: "Safety & Privacy",
    description: "With round-the-clock security personnel, secure access, and absolute confidentiality, your peace of mind is our highest priority.",
  },
  {
    icon: <FaAward className="text-4xl text-amber-500" />,
    title: "Premium Standards",
    description: "From top-tier hygiene protocols to uninterrupted high-speed internet and power supply, we never cut corners on quality.",
  },
];

const Values = () => {
  return (
    <section className="xl:px-30 lg:px-20 md:px-8 px-5 py-20 bg-main text-white relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(70,74,124,0.8),transparent)] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="font-dancing text-3xl text-amber-400 font-semibold tracking-wide">
            Our Pillars
          </span>
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-white">
            Core Values We Live By
          </h2>
          <p className="text-white/80 text-sm md:text-base mt-2">
            At Hybrid Hotel & Suites, our hospitality philosophy is rooted in a passion for service and a dedication to absolute guest satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((val, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col gap-4 group hover:-translate-y-2 shadow-lg backdrop-blur-sm"
            >
              <div className="bg-white/10 p-4 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-300">
                {val.icon}
              </div>
              <h3 className="font-poppins font-bold text-xl text-white group-hover:text-amber-400 transition-colors duration-300">
                {val.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
