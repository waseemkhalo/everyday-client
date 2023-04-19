import { useState } from "react";
import logo from "../../assets/logo/logo.png";
import screenshot from "../../assets/icons/screencapture-localhost-3000-home-2023-04-19-08_27_37.png";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

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

      <section>
        <div className="flex justify-center items-center mt-6">
          <div className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">Welcome to Everyday</h1> 
            {/* COOL IDEA - have the words below transition beside the word EveryDay... like Everyday Todos, Everyday Notes, etc */}
            <h1 className="text-4xl font-bold">
              ToDos ✅ Notes 📝 Progress Tracking 📈
            </h1>
            <h1 className="text-2xl">Your accountability buddy</h1>
            <button
              onClick={handleOpenAuth}
              className=" shadow-lg bg-lightOrange hover:bg-orange text-black rounded-md p-2"
            >
              Try Everyday for free
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-6">
          <div className="flex flex-col items-center">
            <h1 className="text-6xl font-bold">How it works</h1>
            <div className="p-16">
              <span className="text-center">
                Hold yourself accountable for what you said you'd complete
                today. Each day is given an entry, and you have 24 hours to
                complete your todo list ⏰. When you miss a day, you'll skip an entry, which means you'll
                have one less opportunity to complete your tasks. This feature
                encourages you to stay on track and not let your daily tasks
                fall behind.
              </span>
            </div>
            <img
              className="w-8/12 rounded-lg shadow-xl"
              src={screenshot}
              alt="screenshot of product"
            />
          </div>
        </div>
      </section>

      <Footer />

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
