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
            <button onClick={() => setIsModalOpen(false)}>Close</button>
            <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <br />
              <label>
                Time:
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
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
              <button type="submit">Submit</button>
            </form>
          </div>
        </div >
      )}
    </>
  );
};



export default RemindMeForm;
