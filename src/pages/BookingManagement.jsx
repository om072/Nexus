import React, { useState } from 'react';
import '../styles/Booking.css';
import axios from 'axios';

function BookingManagement() {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [center, setCenter] = useState('');
  const [court, setCourt] = useState('');
  const [sport, setSport] = useState('');
  const [time, setTime] = useState('');

  const centers = ['Center 1', 'Center 2', 'Center 3'];
  const sports = ['Badminton', 'Swimming', 'Tennis'];
  const courts = ['Court 1', 'Court 2', 'Court 3', 'Pool 1'];
  
  const timeSlots = [
    '6:00 AM - 7:00 AM',
    '7:00 AM - 8:00 AM',
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
  ];

  const handleNewBooking = async (e) => {
    e.preventDefault();
    try {
        const data = {
          date: date,
          email: email,
          time: time,
          sport: sport,
          center: center,
          court: court
        }
        if(date == "" || email == "" || time == "" || sport == "" || center == "" || court == ""){
          alert("All Fields Required");
          return;
        }
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
    
        const selectedDate = new Date(date);
        if (selectedDate < currentDate) {
          alert("Invalid Date. Cannot select a past date for booking.");
          return;
        }
        const response = await axios.post('http://localhost:7000/createBooking', data);
    }
    catch(error){
      alert("Booking Failed");
      return;  
    }
    alert(`Booking Created for ${email}`);
    setEmail('');
    setDate('');
    setCenter('');
    setCourt('');
    setSport('');
    setTime('');
  };

  return (
    <div className="container">
      <div className="new-booking">
        <h2>Create New Booking</h2>
        <form onSubmit={handleNewBooking}>
          <div>
            <label>Booked by (Email):</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the person's email"
              required
            />
          </div>

 
          <div>
            <label>Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

         
          <div>
            <label>Select Center:</label>
            <select value={center} onChange={(e) => setCenter(e.target.value)} required>
              <option value="">Select Center</option>
              {centers.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

      
          <div>
            <label>Select Court:</label>
            <select value={court} onChange={(e) => setCourt(e.target.value)} required>
              <option value="">Select Court</option>
              {courts.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Select Sport:</label>
            <select value={sport} onChange={(e) => setSport(e.target.value)} required>
              <option value="">Select Sport</option>
              {sports.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Select Time Slot:</label>
            <select value={time} onChange={(e) => setTime(e.target.value)} required>
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <button className='btn' type="submit">Create Booking</button>
        </form>
      </div>
    </div>
  );
}

export default BookingManagement;
