import React, { useState } from 'react';
import './RemindMeForm.scss';

const RemindMeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Email:', email);
    console.log('Frequency:', frequency);
  };

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
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
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

              <span className='mt-6'>This feature is exclusively designed to dispatch daily reminders at your specified time, ensuring timely and personalized notifications.</span>

            </form>
          </div>
        </div >
      )}
    </>
  );
};



export default RemindMeForm;
