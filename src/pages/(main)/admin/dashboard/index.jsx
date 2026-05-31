import React from "react";
import TopNav from "./_component/TopNav";
import Header from "./_component/Header";
import StatOverview from "./_component/StatOverview";
import AvailableRooms from "./_component/AvailableRooms";

const Home = () => {
  return (
    <>
      <TopNav />
      <Header />
      <StatOverview />
      <AvailableRooms />
    </>
  );
};

export default Home;