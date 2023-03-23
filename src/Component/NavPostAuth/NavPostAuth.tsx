import React from "react";
import logo from "../../assets/logo/logo.png";

function NavPostAuth() {
  return (
    <>
      <div className="flex sm:mx-4 md:mx-16 lg:mx-32 justify-between items-center">
        <img
          className="sm:w-28 sm:h-28 md:w-48 md:h-48 lg:mr-80"
          src={logo}
        ></img>
        <div className="HAMBURGER-ICON flex space-x-0 lg:ml-48">
          
        </div>
      </div>
    </>
  );
}

export default NavPostAuth;
