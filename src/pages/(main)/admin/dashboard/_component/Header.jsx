import React, { useEffect, useState } from "react";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 justify-between items-center my-3 mx-3">
      <div className="not-md:hidden"></div>
      <div className=" text-sm py-5">
        <h2>{mounted ? formattedDate : "Loading date..."}</h2>
      </div>
      <div className="justify-self-end">
        <button
          className={`bg-main w-38.25 md:w-41.25 h-10.75 text-sm text-white hover:text-main hover:bg-background hover:border-main hover:border rounded-md font-semibold transition-all ease-in-out duration-1000 cursor-pointer`}
        >
          Create Booking
        </button>
      </div>
    </div>
  );
};

export default Header;