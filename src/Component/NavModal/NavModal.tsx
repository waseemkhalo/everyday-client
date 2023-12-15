import { useEffect, useState } from "react";
import facebookIcon from "../../assets/icons/facebook-icon.svg";
import hamburgerMenu from "../../assets/icons/hamburger-menu.png";
import instagramIcon from "../../assets/icons/instagram-icon.png";
import logos from "../../assets/logo/everydaynewlogo.png";
import { auth } from "../../firebase/firebase";
import FeedbackModal from "../FeedbackModal/FeedbackModal";

/**hamburger button navigation modal */
function NavModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  //when open, disable scrollbar as content should fill the screen. when closed, reset scroll to auto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <FeedbackModal />
      <button className='pl-6' onClick={toggleModal}>
        <img src={hamburgerMenu} alt="hamburger menu" />
      </button>

      <div className={`fixed z-10 inset-0 ${isOpen ? "block" : "hidden"}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white w-full h-screen rounded-md shadow-lg p-6">
            <button onClick={toggleModal}>
              <h1 className="sm:text-4xl md:text-6xl lg:text-6xl">X</h1>
            </button>

            <img src={logos} alt="logo" className=" max-h-[44vh] m-auto" />

            <ul className="text-2xl lg:text-3xl flex flex-col justify-center gap-8 lg:gap-12 items-center mb-8 ">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <FeedbackModal />
              </li>
              {/* <li> */}
              {/* currently have no profile page so no need for profile link */}
              {/* <a className='text-3xl' href="#">Profile</a> */}
              {/* </li> */}
              <li>
                <a href="/" onClick={() => auth.signOut()}>
                  Logout
                </a>
              </li>

              <div className="flex-col">
                <div className="flex gap-10 justify-center">
                  <a target="_blank" rel="noreferrer" href="https://www.instagram.com/tryeverydaytodo/">
                    <img
                      src={instagramIcon}
                      alt="Instagram"
                      className="w-8 pb-4"
                    />
                  </a>
                  <a target="_blank" rel="noreferrer" href="https://www.facebook.com/everydaytodo/">
                    <img
                      src={facebookIcon}
                      alt="Facebook"
                      className="w-8 pb-4"
                    />
                  </a>
                </div>
                <h1 className="text-center">Everyday © 2023</h1>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavModal;
