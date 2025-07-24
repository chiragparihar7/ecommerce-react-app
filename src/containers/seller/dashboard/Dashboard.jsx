import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, sellerLogout } from "../../../redux/slices/sellerSlice";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

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

      {/* Bottom Static Profile Section */}
      <div className="mt-auto pt-4 border-t">
        <div className="flex items-center space-x-3 mb-2">
          <img
            src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">{seller?.name}</p>
            <p className="text-xs text-gray-500">{seller?.email}</p>
          </div>
        </div>
        <button
          onClick={() => {
            dispatch(sellerLogout());
            localStorage.removeItem("token");
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
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchSellerProfile = async () => {
      if (!token) return;

      try {
        const res = await DataService.get(API.SELLER_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(loginSuccess({ seller: res.data.seller, token })); // 
      } catch (err) {
        console.log("Auto-login failed", err);
      }
    };

    fetchSellerProfile();
  }, []);

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
