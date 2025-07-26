// DashboardHome.jsx
import React, { useEffect, useState } from "react";
import DataService from "../../../../config/DataService";
import { API } from "../../../../config/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DashboardHome = () => {
  const adminToken = useSelector((state) => state.admin.token);

  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalSales: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const [usersRes, sellersRes, productsRes, salesRes] = await Promise.all([
        DataService(adminToken).get(API.ADMIN_ALL_USERS),
        DataService(adminToken).get(API.ADMIN_SELLER_LIST),
        DataService(adminToken).get(API.ADMIN_PRODUCT_LIST),
        DataService(adminToken).get(API.ADMIN_SALES_ANALYTICS),
      ]);

      setSummary({
        totalUsers: usersRes?.data?.count || 0,
        totalSellers: sellersRes?.data?.count || 0,
        totalProducts: productsRes?.data?.products?.length || 0,
        totalSales: salesRes?.data?.totalSales || 0,
      });
    } catch (err) {
      toast.error("Error fetching dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-sm text-gray-500 mb-2">👤 Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">{summary.totalUsers}</p>
        </div>

        {/* Total Sellers */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-sm text-gray-500 mb-2">🛍️ Total Sellers</h2>
          <p className="text-2xl font-bold text-green-600">{summary.totalSellers}</p>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-sm text-gray-500 mb-2">📦 Total Products</h2>
          <p className="text-2xl font-bold text-purple-600">{summary.totalProducts}</p>
        </div>

        {/* Total Sales */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-sm text-gray-500 mb-2">💰 Total Sales</h2>
          <p className="text-2xl font-bold text-red-600">₹{summary.totalSales.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
