// src/containers/admin/pages/dashboard/AdminDashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
