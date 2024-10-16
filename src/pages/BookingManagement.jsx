import React, { useEffect, useState } from 'react';
import '../styles/Booking.css';
import axios from 'axios';

function BookingManagement() {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [centers, setCenters] = useState([]);
  const [court, setCourt] = useState('');
  const [time, setTime] = useState('');

  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedSport, setSelectedSport] = useState("");
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]);

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
        sport: selectedSport,
        center: selectedCenter ? selectedCenter.name : '',
        court: court
      };
      if (!date || !email || !time || !selectedSport || !selectedCenter || !court) {
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
      alert(`Booking Created for ${email}`);
      setEmail('');
      setDate('');
      setSelectedCenter(null);
      setSelectedSport('');
      setCourt('');
      setTime('');
    } catch (error) {
      alert("Booking Failed");
      console.log(error);
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
    setCourt('');
    setFilteredCourts([]);
  };

  const handleSportChange = (e) => {
    const sportId = e.target.value;
    setSelectedSport(sportId);

    if (selectedCenter) {
      const selectedSportObject = selectedCenter.sports.find(s => s._id === sportId);
      setFilteredCourts(selectedSportObject ? selectedSportObject.courts : []);
      setCourt('');
    }
  };

  return (
    <div className="container">
      <div className="new-booking">
        <h2>Create New Booking</h2>
        <form onSubmit={handleNewBooking}>
          <div>
            <label>Booked by (Email):</label>
            <input
              type="email"
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

          <div>
            <label>Select Court:</label>
            <select value={court} onChange={(e) => setCourt(e.target.value)} required>
              <option value="">Select Court</option>
              {filteredCourts.map((c) => (
                <option key={c._id} value={c._id}>
                  Court {c.number}
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
