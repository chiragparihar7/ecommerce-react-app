import React from 'react';
import Header from '../../../../components/Header';
import './Dashboard.css'; // 👈 Make sure this file exists

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <p className="welcome-msg">Welcome to the admin panel.</p>

        <div className="summary-section">
          <h3 className="summary-title">Summary</h3>
          <ul className="summary-list">
            <li>Total Users: <span className="value">120</span></li>
            <li>Open Users: <span className="value">18</span></li>
            <li>Resolved Users: <span className="value">102</span></li>
            <li>System Health: <span className="value good">Good</span></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
