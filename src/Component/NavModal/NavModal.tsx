import { useEffect, useState } from "react";
import hamburgerMenu from "../../assets/icons/hamburger-menu.png";
import logo from "../../assets/logo/logo.png";
import { auth } from "../../firebase/firebase";
import FeedbackModal from "../FeedbackModal/FeedbackModal";


function NavModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [isOpen])

  return (
    <>
      <button onClick={toggleModal}>
        <img src={hamburgerMenu} alt="hamburger menu" />
      </button>

      <div className={`fixed z-10 inset-0 ${isOpen ? "block" : "hidden"}`} >
        <div className="flex items-center justify-center min-h-screen">

          <div className="bg-white w-full h-screen rounded-md shadow-lg p-6">

            <button onClick={toggleModal}>
              <h1 className='sm:text-4xl md:text-6xl lg:text-7xl'>X</h1>
            </button>

            <img src={logo} alt="logo" className=" max-h-[40vh] m-auto" />

            <ul className="text-2xl flex flex-col justify-center gap-4 items-center mb-8 ">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <FeedbackModal />
              </li>
              <li>
                {/* <a className='text-3xl' href="#">Profile</a> */}
              </li>
              <li>
                <a href="/" onClick={() => auth.signOut()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavModal;
