import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import BookingManagement from './pages/BookingManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <div className="logo">NEXUS</div>
          <nav className="menu">
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/schedule">Schedule</Link></li>
              <li><Link to="/bookings">Bookings</Link></li>
            </ul>
          </nav>
        </aside>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/bookings" element={<BookingManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
