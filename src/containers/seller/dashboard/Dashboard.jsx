// src/pages/seller/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesCard = ({ title, value }) => (
  <div className="p-4 bg-white rounded-xl shadow-md text-center">
    <h4 className="text-md text-gray-600">{title}</h4>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
);

const RecentOrdersTable = ({ orders }) => (
  <div className="overflow-x-auto mt-6">
    <table className="min-w-full text-left text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Order ID</th>
          <th className="p-2">Customer</th>
          <th className="p-2">Status</th>
          <th className="p-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-b">
            <td className="p-2">{order.id}</td>
            <td className="p-2">{order.customer}</td>
            <td className="p-2 text-yellow-600">{order.status}</td>
            <td className="p-2">${order.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="w-64 h-screen flex flex-col bg-white border-r p-4">
    <div>
      <h2 className="text-xl font-bold mb-6">Seller Panel</h2>
      <ul className="space-y-2">
        {['Dashboard', 'Product Management', 'Order Management'].map((tab) => (
          <li
            key={tab}
            className={`cursor-pointer p-2 rounded-md hover:bg-gray-100 ${
              activeTab === tab ? 'bg-blue-100 text-blue-600 font-semibold' : ''
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>

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
          window.location.href = "/seller/login"; // or use navigate()
        }}
        className="text-red-500 text-sm hover:underline"
      >
        Logout
      </button>
    </div>
  </div>
);

const DashboardContent = ({ summary, orders }) => (
  <div className="p-6 bg-gray-50 w-full">
    <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <SalesCard title="Total Sales" value={summary.totalSales} />
      <SalesCard title="Revenue" value={`$${summary.revenue}`} />
      <SalesCard title="Pending Orders" value={summary.pendingOrders} />
      <SalesCard title="Cancelled Orders" value={summary.cancelledOrders} />
    </div>
    <RecentOrdersTable orders={orders} />
  </div>
);

const ProductManagement = () => (
  <div className="p-6 w-full">
    <h1 className="text-2xl font-bold">Product Management</h1>
    <p className="mt-4">List, edit, or remove your products here.</p>
  </div>
);

const OrderManagement = () => (
  <div className="p-6 w-full">
    <h1 className="text-2xl font-bold">Order Management</h1>
    <p className="mt-4">View and manage your customer orders here.</p>
  </div>
);

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    setSummary({
      totalSales: 120,
      revenue: 85430,
      pendingOrders: 5,
      cancelledOrders: 3,
    });
    setOrders([
      { id: "ORD123", customer: "Alice", status: "Pending", total: 250 },
      { id: "ORD124", customer: "Bob", status: "Shipped", total: 180 },
      { id: "ORD125", customer: "Carol", status: "Cancelled", total: 90 },
      { id: "ORD125", customer: "Carol", status: "Cancelled", total: 90 },
    ]);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Dashboard" && <DashboardContent summary={summary} orders={orders} />}
      {activeTab === "Product Management" && <ProductManagement />}
      {activeTab === "Order Management" && <OrderManagement />}
    </div>
  );
};

export default Dashboard;