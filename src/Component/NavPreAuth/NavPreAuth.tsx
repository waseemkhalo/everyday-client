import logo from "../../assets/logo/logo.png";
import Login from "../Login/Login";
import { useState } from "react";

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
          src={logo} alt="logo"
        />
        <div className="flex space-x-0 lg:ml-48">
          <button 
          className="w-20 h-10 bg-lightOrange hover:bg-orange rounded-md"
          onClick={handleOpenAuth}
          >
            {openAuth && <Login />}
            Sign Up
          </button>
          <button className="w-20 h-10"
          onClick={handleOpenAuth}>
            {openAuth && <Login />}
            Sign In</button>
        </div>
      </div>
    </>
  );
}

export default NavPreAuth;
