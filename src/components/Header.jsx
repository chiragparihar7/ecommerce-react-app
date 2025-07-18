import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="sidebar">
      <div className="menu">
        <div className="menu-item">
          <i className="icon">🏠</i>
          <span>Dashboard</span>
        </div>
        <div className="menu-item">
          <i className="icon">📨</i>
          <span>Tickets</span>
        </div>
        <div className="menu-item">
          <i className="icon">👥</i>
          <span>Users</span>
        </div>
        <div className="menu-item">
          <i className="icon">⚙️</i>
          <span>Settings</span>
        </div>
      </div>

      <div className="profile">
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="avatar"
        />
        <div className="profile-info">
          <p className="name">Gohil Nityrajsinh</p>
          <p className="role">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
