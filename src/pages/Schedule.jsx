import React, { useState } from 'react';
import '../styles/SchedulePage.css'; 
import axios from 'axios';

function SchedulePage() {
  const [date, setDate] = useState('');
  const [sport, setSport] = useState('');
  const [bookings, setBookings] = useState("");

  const handleSearch = async () => {
    try {
      if(date == "" || sport == ""){
        alert("All Fields Required");
        return;
      }
      const response = await axios.get('http://localhost:7000/getBookings', {
        params: {
          date: date,
          sport: sport
        }
      });
      console.log(response.data);
      setBookings(response.data)
    }
    catch(error){
      console.log(error);  
      alert("Error Fetching Bookings");
      return;
    }
  };

  return (
    <div className="schedule-container">
      <h1>Schedule</h1>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="sport">Select Sport:</label>
          <select
            id="sport"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            <option value="">Select Sport</option>
            <option value="Badminton">Badminton</option>
            <option value="Swimming">Swimming</option>
            <option value="Tennis">Tennis</option>
          </select>
        </div>
        <button className='btn1' onClick={handleSearch}>Get Bookings</button>
      </div>

      <div className="bookings-section">
        {bookings.length > 0 ? (
          <div>
            <h2>Bookings for {date} {sport && `(${sport})`}</h2>
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Email</th>
                  <th>Sport</th>
                  <th>Center</th>
                  <th>Court</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>{booking.email}</td>
                    <td>{booking.sport}</td>
                    <td>{booking.center}</td>
                    <td>{booking.court}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default SchedulePage;