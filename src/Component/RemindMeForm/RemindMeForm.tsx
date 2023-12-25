import { auth } from "../../firebase/firebase";
import React, { useEffect, useState } from "react";
import { Reminder, addReminder } from "../../services/reminderService";
import { getUser } from "../../services/userService";
import { toast } from "react-toastify";
import "./RemindMeForm.scss";

function RemindMeForm() {
  const [email, setEmail] = useState<any>();
  const [emailOnProfile, setEmailOnProfile] = useState("");
  const [optIn, setOptIn] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [user, setUser] = useState<any>();


useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((authUser) => {
    if (authUser && authUser.email) {
      setEmailOnProfile(authUser.email);
    } else {
      // If authUser is falsy or doesn't exist, try to get the email from another source (e.g., getUser)
      const userBackupPromise = getUser(); // Make sure getUser returns a Promise

      userBackupPromise.then((userBackup) => {
        console.log(userBackup);
        if (userBackup && userBackup.email) {
          setEmailOnProfile(userBackup.email);
        } else {
          console.log("No email found");
        }
      });
    }
  });

  return () => unsubscribe();
}, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && optIn) {
      try {
        // Create a new reminder object
        const newReminder = new Reminder(email, optIn);

        await addReminder(newReminder);

        // After sending the reminder to the database, close the modal, display a toast, and clear the form
        toggleModal();
        toast.success("Reminder set, Thank you!");
        const target = e.target as HTMLFormElement;
        target.reset();
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        // Handle the error or display an error message to the user
      }
    }
  };

  const handleOptIn = (value: string) => {
    setOptIn(value || "");
    localStorage.setItem("optIn", value || "");
  }

  const toggleModal = () => setIsModalOpen(!isModalOpen);


  return (
    <>
      <button onClick={toggleModal} className="text-white">
        Set Reminder
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>

            <form className="modal-form" onSubmit={handleSubmit}>
              <label className="modal-form__title">
                Email:
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email || emailOnProfile}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modal-form__input ml-4"
                />
              </label>
              <br />
              <label
                className="modal-form__title pr-3">
                Opt In:
                <input
                  type="radio"
                  name="survey"
                  id="yes"
                  value="yes"
                  onChange={() => handleOptIn('true')}
                  checked={optIn === 'true'}
                />
                Yes
                <input
                  type="radio"
                  name="survey"
                  id="no"
                  value="no"
                  onChange={() => handleOptIn('false')}
                  checked={optIn === 'false'}
                />
                No
              </label>

              <button
                type="submit"
                className='modal-form__button border-solid rounded-md p-3 mt-4 bg-blue hover:bg-lightBlue text-white '
              >Submit
              </button>
              <span className='mt-6 flex justify-center'>By clicking submit, you agree to receive daily reminders from us. You can opt out at anytime.</span>
            </form>

          </div>
        </div >
      )}
    </>
  );
};



export default RemindMeForm;
