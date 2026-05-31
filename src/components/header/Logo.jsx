import { images } from "@/utils/images";
import { Link } from "react-router-dom";
import React from "react";

const Logo = ({ src }) => {
  return (
    <div className="">
      <Link to="/">
        <img src={src}
          alt="Hybrid hotel & suite logo"
          width={80}
          height={80}
          loading="eager"
        />
      </Link>
    </div>
  );
};

export default Logo;
