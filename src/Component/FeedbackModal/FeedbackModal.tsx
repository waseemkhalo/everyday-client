import { useState } from "react";
import { auth } from "../../firebase/firebase";
import hamburgerMenu from "../../assets/icons/hamburger-menu.png";
import logo from "../../assets/logo/logo.png";

function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={toggleModal}>Feedback</button>

      <div
        className={`fixed z-10 inset-5 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
      >

          <div className="bg-white w-fit h-fit rounded-md shadow-lg p-6">

            <button onClick={toggleModal}>
              <h1 className='text-6xl'>X</h1>
            </button>

            <form>
              <label htmlFor="feedback">Feedback</label>
              <input type="text" name="feedback" id="feedback" />
            </form>




          </div>
      </div>
    </>
  );
}

export default FeedbackModal;
