// src/containers/admin/pages/dashboard/DashboardSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const DashboardSidebar = () => {
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"}`;

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <NavLink to="/admin/dashboard" className={linkClasses}>
        Dashboard Home
      </NavLink>
      <NavLink to="/admin/dashboard/categorys" className={linkClasses}>
        Manage Categories
      </NavLink>
      <NavLink to="/admin/dashboard/sellers" className={linkClasses}>
        Manage Sellers
      </NavLink>
    </div>
  );
};

export default DashboardSidebar;
