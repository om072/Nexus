import React, { useState } from 'react';
import '../styles/SchedulePage.css'; 
import axios from 'axios';
import { useEffect } from 'react';

function SchedulePage() {
  const [bookings, setBookings] = useState("");
  const [date, setDate] = useState('');
  const [centers, setCenters] = useState([]);

  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedSport, setSelectedSport] = useState("");
  const [filteredSports, setFilteredSports] = useState([]);

  const handleSearch = async () => {
    try {
      if(date == "" || selectedSport == "" || selectedCenter == ""){
        alert("All Fields Required");
        return;
      }
      const response = await axios.get('http://localhost:7000/getBookings', {
        params: {
          date: date,
          sport: selectedSport,
          center: selectedCenter
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
  const fetchCenters = async () => {
    try {
      const res = await axios.get('http://localhost:7000/getCenters');
      setCenters(res.data);
    } catch (error) {
      alert("Error Occurred");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);
  const handleCenterChange = (e) => {
    const center = centers.find(c => c._id === e.target.value);
    setSelectedCenter(center);
    setFilteredSports(center ? center.sports : []);
    setSelectedSport('');
  };

  const handleSportChange = (e) => {
    const sportId = e.target.value;
    setSelectedSport(sportId);

    if (selectedCenter) {
      const selectedSportObject = selectedCenter.sports.find(s => s._id === sportId);
    }
  };

  return (
    <div className="schedule-container">
      <h1>Schedule</h1>

      <div className="filters">
        <div className="filter-group">
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
            <select value={selectedCenter ? selectedCenter._id : ''} onChange={handleCenterChange} required>
              <option value="">Select Center</option>
              {centers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Select Sport:</label>
            <select value={selectedSport} onChange={handleSportChange} required>
              <option value="">Select Sport</option>
              {filteredSports.map((sport) => (
                <option key={sport._id} value={sport._id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className='btn1' onClick={handleSearch}>Get Bookings</button>
      </div>

      <div className="bookings-section">
        {bookings.length > 0 ? (
          <div>
            <h2>Bookings for {date} {selectedSport && `(${selectedSport})`}</h2>
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
                    <td>{booking.sport.name}</td>
                    <td>{booking.center}</td>
                    <td>Court {booking.court.number}</td>
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