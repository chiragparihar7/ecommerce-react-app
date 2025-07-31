import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../../../../redux/slices/adminSlice";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const admin = useSelector((state) => state.admin.admin);

  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      isActive ? "bg-blue-500 text-white" : "text-gray-700"
    }`;

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4 flex flex-col justify-between">
      <div>
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

        <NavLink to="/admin/dashboard/users" className={linkClasses}>
          Manage Users
        </NavLink>
      </div>

      {/* Profile Section */}
      <div className="mt-6 border-t pt-4 text-sm text-gray-700">
        <p className="font-medium">{admin?.name || "Admin Name"}</p>
        <p className="text-xs text-gray-500 truncate">
          {admin?.email || "admin@example.com"}
        </p>
        <button
          onClick={handleLogout}
          className="mt-2 text-red-600 hover:underline text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
