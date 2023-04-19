import { useState } from "react";
import logo from "../../assets/logo/logo.png";
import Login from "../Login/Login";

/**top landing page header */
function NavPreAuth() {
  const [openAuth, setOpenAuth] = useState(false);

  const handleOpenAuth = () => {
    setOpenAuth(true);
  };

  const handleCloseAuth = () => {
    setOpenAuth(false);
  };

  return (
    <>
      <div className="flex sm:mx-4 md:mx-16 lg:mx-32 justify-between items-center">
        <img
          className="sm:w-32 sm:h-32 md:w-40 md:h-40 lg:mr-80"
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

      <section>
        <div className="flex justify-center items-center mt-6">
          <div className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">Welcome to Everyday</h1>
            <h1 className="text-4xl font-bold">ToDos ✅ Notes 📝 Progress Tracking 📈</h1>
            <h1 className="text-2xl">Your accountability buddy</h1>
            <button 
            onClick={handleOpenAuth}
            className="bg-lightOrange text-black rounded-xl p-2">Try EveryDay for free</button>
          </div>
        </div>
      </section>

      : {openAuth && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div>
            <button onClick={handleCloseAuth}>Close</button>
            <Login />
          </div>
        </div>
      )}
    </>
  );
}

export default NavPreAuth;
