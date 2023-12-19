import { auth } from "../../firebase/firebase";
import React, { useEffect, useState } from "react";
import { Reminder, addReminder } from "../../services/reminderService";
import { toast } from "react-toastify";
import "./RemindMeForm.scss";

function RemindMeForm() {
  const [email, setEmail] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        // If the user is signed in with an email, set the email field in the form
        if (authUser.email) {
          setEmail(authUser.email);
        }
      }
    });


    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && reminderTime) {
      try {
        // Create a new reminder object
        const newReminder = new Reminder(email, reminderTime);

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
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modal-form__input ml-4"
                />
              </label>
              <br />
              <label className="modal-form__title">
                Time:
                <select
                  value={reminderTime}
                  id="reminderTime"
                  name="reminderTime"
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="modal-form__input ml-4"
                >
                  <option value="daily">Select...</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                </select>
              </label>

              <button
                type="submit"
                className='modal-form__button border-solid rounded-md p-3 mt-4 bg-blue hover:bg-lightBlue text-white '
              >Submit
              </button>

              <span className='mt-6'>This feature is exclusively created to dispatch daily reminders at your specified time, ensuring timely and personalized notifications.</span>

            </form>

          </div>
        </div >
      )}
    </>
  );
};



export default RemindMeForm;
