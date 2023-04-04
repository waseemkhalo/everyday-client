import { useState } from "react";
import hamburgerMenu from "../../assets/icons/hamburger-menu.png";
import logo from "../../assets/logo/logo.png";


function NavModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={toggleModal}>
        <img src={hamburgerMenu} alt="hamburger menu" />
      </button>

      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
      >
        <div className="flex items-center justify-center min-h-screen">

          <div className="bg-white w-full h-screen rounded-md shadow-lg p-6">

            <button onClick={toggleModal}>
              <h1 className='text-7xl'>X</h1>
            </button>

            <img src={logo} alt="logo" />

            <ul className="flex flex-col justify-center space-y-12 items-center mb-8">
              <li>
                <a className='text-3xl' href="#">Home</a>
              </li>
              <li>
                <a className='text-3xl' href="#">Feedback</a>
              </li>
              <li>
                <a className='text-3xl' href="#">Profile</a>
              </li>
              <li>
                <a className='text-3xl' href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavModal;
