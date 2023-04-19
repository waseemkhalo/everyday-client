import logo from "../../assets/logo/logo.png";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

/**top landing page header */
function NavPreAuth({openAuth, handleOpenAuth, handleCloseAuth}: {openAuth: boolean, handleOpenAuth: () => void, handleCloseAuth: () => void}) {
  
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
            className="w-20 h-10 shadow-lg bg-lightOrange hover:bg-orange rounded-md"
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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg sm:h-screen sm:w-screen flex flex-col items-center justify-center">
            <button onClick={handleCloseAuth}>Close</button>
            <Login />
          </div>
        </div>
      )}
    </>
  );
}

export default NavPreAuth;
