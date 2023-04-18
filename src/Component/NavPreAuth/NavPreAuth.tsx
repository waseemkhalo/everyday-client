import { useState } from "react";
import logo from "../../assets/logo/logo.png";
import Login from "../Login/Login";

function NavPreAuth() {
  const [openAuth, setOpenAuth] = useState(false);

  const handleOpenAuth = () => {
    setOpenAuth(true);
  };

  return (
    <>
      <div className="flex sm:mx-4 md:mx-16 lg:mx-32 justify-between items-center">
        <img
          className="sm:w-28 sm:h-28 md:w-48 md:h-48 lg:mr-80"
          src={logo}
          alt="logo"
        />
        <div className="flex space-x-0 lg:ml-48">
          <button
            className="w-20 h-10 bg-lightOrange hover:bg-orange rounded-md"
            onClick={handleOpenAuth}
          >
            Sign Up
          </button>
          <button className="w-20 h-10" onClick={handleOpenAuth}>
            Sign In
          </button>
        </div>
      </div>

      {openAuth && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50"
        >
          <div>
            <Login />
          </div>
        </div>
      )}
    </>
  );
}

export default NavPreAuth;
