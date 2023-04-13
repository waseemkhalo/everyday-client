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
        className={`fixed z-10 inset-0 overflow-y-auto flex items-center justify-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-white w-6/12 h-fit rounded-md shadow-lg p-6">
          <button onClick={toggleModal}>
            <h1 className="text-6xl">X</h1>
          </button>

          <form className="flex-col">
            <label htmlFor="survey">Are you enjoying your experiance?</label>
            <div className="flex items-center space-x-2">
              <input type="radio" name="survey" id="yes" value="yes" />
              <label htmlFor="yes">Yes</label>
              <input type="radio" name="survey" id="no" value="no" />
              <label htmlFor="no">No</label>
            </div>

            <label htmlFor="feedback"></label>
            <textarea
              placeholder="Tell us about your experiance"
              name="feedback"
              id="feedback"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default FeedbackModal;
