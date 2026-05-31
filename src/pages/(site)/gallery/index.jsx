import React from "react";
import { Link } from "react-router-dom";

const galleryImages = [
  {
    src: "/blue_room_1.png",
    title: "Harmony Deluxe Suite",
    desc: "A stunning modern room with vibrant blue accents, crisp white linens, and premium ambiance.",
  },
  {
    src: "/blue_room_2.png",
    title: "Harmony Executive Suite",
    desc: "A luxury oceanview setup with elegant navy curtains, white marble, and clean architectural design.",
  },
  {
    src: "/blue_room_3.png",
    title: "Harmony Homeland Room",
    desc: "Cozy boutique suite with blue velvet headboard, white drapes, and warm professional styling.",
  },
  {
    src: "/blue_room_4.png",
    title: "Royal Imperial Suite",
    desc: "Ultra-luxurious suite featuring majestic blue velvet accents, white marble floors, and panoramic view.",
  },
  {
    src: "/blue_room_5.png",
    title: "Signature Twin Room",
    desc: "A chic modern space styled with dual single beds, crisp linens, and deep slate blue walls.",
  },
  {
    src: "/blue_room_6.png",
    title: "Harmony VIP Lounge",
    desc: "Spacious private lounge within the suite, featuring deep navy sofas and custom architectural lighting.",
  },
  {
    src: "/blue_room_7.png",
    title: "Premium Marble Bathroom",
    desc: "Modern bathroom styled with white marble tiling, blue cabinets, and a freestanding luxury tub.",
  },
  {
    src: "/blue_room_8.png",
    title: "Oceanfront Terrace Suite",
    desc: "Sunset view room leading to a balcony with royal blue lounge chairs and sea breezes.",
  },
  {
    src: "/blue_room_9.png",
    title: "Harmony King Detail",
    desc: "Intimate close-up showing custom blue velvet throws, plush pillows, and brass fixtures.",
  },
];

const Gallery = () => {
  return (
    <section className="bg-background min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full text-center overflow-hidden flex flex-col gap-2 items-center justify-center hero3">
        <h2 className="font-extrabold text-[40px] md:text-[60px] text-white uppercase tracking-wider font-poppins">
          Photo Gallery
        </h2>
        <div className="flex items-center gap-2 text-white/95 text-sm md:text-base font-semibold bg-black/35 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-lg">
          <Link to="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span className="text-white/40">|</span>
          <span className="text-amber-400">Gallery</span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h3 className="text-main font-semibold uppercase tracking-wider text-sm">Visual Experience</h3>
          <h2 className="text-black/80 text-3xl md:text-4xl font-extrabold font-poppins mt-2">
            Inside Hybrid Hotel & Suites
          </h2>
          <p className="text-gray-500 mt-4 leading-relaxed">
            Take a virtual tour through our premium suites. Decorated in rich blues and crisp whites, every room is tailored for the ultimate stay.
          </p>
        </div>

        {/* CSS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-main/10 group-hover:bg-transparent transition-all duration-500 z-10" />
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg text-black/80 font-poppins group-hover:text-main transition-colors">
                  {image.title}
                </h4>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {image.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
