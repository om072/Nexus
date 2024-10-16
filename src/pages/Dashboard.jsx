import React, { useEffect, useState } from 'react';
import '../styles/DashboardPage.css';
import axios from 'axios';

function DashboardPage() {
  // Dummy data for overview and recent bookings
  const [totalBookings, setTotal] = useState(0);
  const [uniqueUser, setUser] = useState(0);
  const [recentBookings, setRecent] = useState([]);

  const fetchTotal = async (req, res) => {
    try {
        const res = await axios.get('http://localhost:7000/getTotalBookings');
        setTotal(res.data.totalBookings);
        setUser(res.data.totalUniqueUsers)
    }
    catch(error){
      alert("Error Occured");
      console.log(error);
      return;  
    }
  }

  const fetchRecent = async (req, res) => {
    try {
      const res = await axios.get('http://localhost:7000/recentBooking');
      setRecent(res.data);
    }
    catch(error){
      alert("Error Occured");
      console.log(error);
      return; 
    }
  }

  useEffect(() => {
    fetchTotal();
    fetchRecent();
  }, [])

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="overview">
        <div className="overview-item">
          <h2>Total Bookings</h2>
          <p>{totalBookings}</p>
        </div>
        <div className="overview-item">
          <h2>Total Customers</h2>
          <p>{uniqueUser}</p>
        </div>
      </div>

      <div className="recent-bookings-section">
        <h2>Recent Bookings</h2>
        <table className="recent-bookings-table">
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
            {recentBookings.map((booking, index) => (
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
    </div>
  );
}

export default DashboardPage;
