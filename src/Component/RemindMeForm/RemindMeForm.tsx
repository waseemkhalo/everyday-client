import 'firebase/firestore';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Reminder, addReminder } from '../../services/reminderService';
import './RemindMeForm.scss';

function RemindMeForm() {
  const [email, setEmail] = useState('');
  const [reminderTime, setReminderTime] = useState('daily');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && reminderTime) {

      // create new reminder object
      const newReminder = new Reminder(
        email,
        reminderTime
      );

      await addReminder(newReminder);
      //after sending reminder to db, close the modal, display toast and clear form
      toggleModal()
      toast.success('Reminder set, Thank you!')
      const target = e.target as HTMLFormElement
      target.reset()
    }
  }

  const toggleModal = () => setIsModalOpen(!isModalOpen);



  return (
    <>
      <button onClick={toggleModal} className='text-white' >Set Reminder</button>

      {isModalOpen && (
        <div className='modal'>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>X</button>

            <form className='modal-form' onSubmit={handleSubmit}>
              <label className='modal-form__title'>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='modal-form__input ml-4'
                />
              </label>
              <br />
              <label className='modal-form__title'>
                Time:
                <select
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className='modal-form__input ml-4'
                >
                  <option value="daily">Select...</option>
                  <option value="12:00">12:00 AM</option>
                  <option value="1:00">1:00 AM</option>
                  <option value="2:00">2:00 AM</option>
                  <option value="3:00">3:00 AM</option>
                  <option value="4:00">4:00 AM</option>
                  <option value="5:00">5:00 AM</option>
                  <option value="6:00">6:00 AM</option>
                  <option value="7:00">7:00 AM</option>
                  <option value="8:00">8:00 AM</option>
                  <option value="9:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="1:00">1:00 PM</option>
                  <option value="2:00">2:00 PM</option>
                  <option value="3:00">3:00 PM</option>
                  <option value="4:00">4:00 PM</option>
                  <option value="5:00">5:00 PM</option>
                  <option value="6:00">6:00 PM</option>
                  <option value="7:00">7:00 PM</option>
                  <option value="8:00">8:00 PM</option>
                  <option value="9:00">9:00 PM</option>
                  <option value="10:00">10:00 PM</option>
                  <option value="11:00">11:00 PM</option>
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
