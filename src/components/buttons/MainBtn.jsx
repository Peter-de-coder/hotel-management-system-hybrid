import React from "react";

const MainBtn = ({ text, radius, onClick }) => {
  return (
    <button
      className={`bg-main w-38.25 md:w-41.25 h-13.75 text-white hover:text-main hover:bg-background hover:border-main hover:border ${radius} font-semibold transition-all ease-in-out duration-1000 cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MainBtn;
