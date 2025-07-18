// src/pages/seller/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "Dashboard", path: "/seller/dashboard" },
    { name: "Product Management", path: "/seller/dashboard/products" },
    { name: "Order Management", path: "/seller/dashboard/orders" },
  ];

  return (
    <div className="w-64 h-screen flex flex-col bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Seller Panel</h2>
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className={`cursor-pointer p-2 rounded-md hover:bg-gray-100 ${
              location.pathname === tab.path
                ? "bg-blue-100 text-blue-600 font-semibold"
                : ""
            }`}
          >
            {tab.name}
          </li>
        ))}
      </ul>

      {/* Bottom Profile Section */}
      <div className="mt-auto pt-4 border-t">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <p className="text-sm font-medium">Seller Name</p>
            <p className="text-xs text-gray-500">seller@example.com</p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            navigate("/seller/login");
          }}
          className="text-red-500 text-sm hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
