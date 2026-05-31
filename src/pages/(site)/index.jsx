import Facilities from "@/components/facilities";
import Hero from "@/components/header/hero";
import Properites from "@/components/properties";
import Rooms from "@/components/rooms";
import Testimonies from "@/components/testimonies";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <Facilities />
      <Rooms />
      {/* <Properites /> */}
      <Testimonies />
    </div>
  );
};

export default Home;
