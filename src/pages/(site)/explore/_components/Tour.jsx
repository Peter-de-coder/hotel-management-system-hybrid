import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaDumbbell, FaUtensils } from "react-icons/fa";
import { images } from "@/utils/images";

const tourData = [
  {
    title: "Luxurious Rooms & Suites",
    subtitle: "UNPARALLELED COMFORT & STYLE",
    description: "Each of our rooms is custom designed to provide the ultimate blend of elegance, functionality, and comfort. Enjoy plush bedding, modern climate controls, smart entertainment, and stunning panoramic views of the city skyline.",
    features: [
      "Ultra-plush King/Queen bedding",
      "High-speed complimentary Wi-Fi",
      "24/7 dedicated room service",
      "Smart ambient lighting control"
    ],
    buttonText: "View Rooms & Suites",
    buttonLink: "/rooms",
    image: images.Room3,
    icon: <FaBed className="text-white text-xl" />,
    badgeColor: "bg-main",
  },
  {
    title: "State-of-the-Art Gym Center",
    subtitle: "STAY FIT & REJUVENATED",
    description: "Keep up with your fitness regime in our fully-equipped wellness center. We feature top-of-the-line cardio machines, extensive free-weight zones, functional trainers, and dedicated space for yoga and stretching.",
    features: [
      "Modern treadmills and ellipticals",
      "Free-weight and strength zone",
      "Professional trainers on stand-by",
      "Complimentary water & fresh towels"
    ],
    buttonText: "Explore Facilities",
    buttonLink: "/gallery",
    image: images.Gym,
    icon: <FaDumbbell className="text-white text-xl" />,
    badgeColor: "bg-main",
    reverse: true,
  },
  {
    title: "Fine Dining & Gourmet Restaurant",
    subtitle: "A CULINARY JOURNEY",
    description: "Indulge in a curated selection of local delicacies and international gourmet creations crafted by our award-class chefs. Enjoy fine dining in an atmospheric, beautifully lit indoor dining hall or our outdoor terrace.",
    features: [
      "Chef-curated seasonal menus",
      "Exquisite global and local cuisine",
      "Premium wine and cocktail list",
      "Cozy indoor & terrace dining options"
    ],
    buttonText: "View Dining Gallery",
    buttonLink: "/gallery",
    image: images.Restaurant,
    icon: <FaUtensils className="text-white text-xl" />,
    badgeColor: "bg-main",
  }
];

const Tour = () => {
  return (
    <div className="bg-[#fafafa] py-16 sm:py-24">
      {/* Header section */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-16 sm:mb-24">
        <span className="text-main font-semibold tracking-widest text-xs sm:text-sm uppercase block mb-3 font-poppins">
          Experience Excellence
        </span>
        <h2 className="text-supportDark font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight font-poppins mb-6">
          Take a Tour of Our Facilities
        </h2>
        <div className="w-20 h-1 bg-main mx-auto mb-6 rounded-full"></div>
        <p className="text-small text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Discover the unique highlights that make Hybrid Hotel & Suites a paradise of hospitality. Explore our modern spaces designed with you in mind.
        </p>
      </div>

      {/* Alternating Layout Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-36">
        {tourData.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-12 xl:gap-20 ${
              item.reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image Box */}
            <div className="w-full lg:w-1/2">
              <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-main/10 rounded-2xl z-10 pointer-events-none transition-colors duration-500"></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[320px] sm:h-[450px] object-cover bg-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Content Box */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
              {/* Badge/Icon Header */}
              <div className="flex items-center gap-4">
                <div className={`p-3.5 rounded-xl shadow-md ${item.badgeColor} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div>
                  <span className="text-main font-semibold tracking-wider text-xs uppercase block font-poppins">
                    {item.subtitle}
                  </span>
                  <h3 className="text-supportDark font-bold text-2xl sm:text-3xl font-poppins mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#454545] text-base sm:text-lg leading-relaxed font-medium">
                {item.description}
              </p>

              {/* Feature Checklist */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-supportDark text-sm sm:text-base font-semibold">
                    <span className="text-main p-1 bg-main/5 rounded-full flex-shrink-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Link Button */}
              <div className="pt-4">
                <Link
                  to={item.buttonLink}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-main hover:bg-main/90 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {item.buttonText}
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tour;
