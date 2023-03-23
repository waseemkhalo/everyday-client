import React from "react";
import logo from "../../assets/logo/logo.png";

function NavPreAuth() {
  return (
    <>
      <div className="flex sm:mx-4 md:mx-16 lg:mx-32 justify-between items-center">
        <img
          className="sm:w-28 sm:h-28 md:w-48 md:h-48 lg:mr-80"
          src={logo}
        ></img>
        <div className="flex space-x-0 lg:ml-48">
          <button className="w-20 h-10 bg-lightOrange hover:bg-orange rounded-md">
            Sign Up
          </button>
          <button className="w-20 h-10">Sign In</button>
        </div>
      </div>
    </>
  );
}

export default NavPreAuth;
