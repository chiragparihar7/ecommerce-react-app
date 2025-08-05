import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../../config/API";
import DataService from "../../../config/DataService";
import { toast } from "react-toastify";

// 📦 Reusable card component
const SalesCard = ({ title, value }) => (
  <div className="p-4 bg-white rounded-xl shadow-md text-center">
    <h4 className="text-md text-gray-600">{title}</h4>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
);

// 📋 Table for recent orders
const RecentOrdersTable = ({ items }) => (
  <div className="overflow-x-auto mt-6">
    <h2 className="text-lg font-semibold mb-2">Recent Items</h2>
    <table className="min-w-full text-left text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Item ID</th>
          <th className="p-2">Product</th>
          <th className="p-2">Status</th>
          <th className="p-2">Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.itemId} className="border-b">
            <td className="p-2">{item.itemId}</td>
            <td className="p-2">{item.productName || "N/A"}</td>
            <td className="p-2 capitalize text-yellow-600">{item.status}</td>
            <td className="p-2">₹{item.price * (item.quantity || 1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DashboardHome = () => {
  const [summary, setSummary] = useState({
    totalSales: 0,
    revenue: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
  });

  const [items, setItems] = useState([]);
  const sellerToken = useSelector((state) => state.seller.seller.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await DataService(sellerToken).get(API.SELLER_ALL_ORDERS);
        const allOrders = res.data.orders || [];

        // Flatten all items with quantity, status, etc.
        const allItems = allOrders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            orderId: order.orderId,
          }))
        );

        // 🔢 Count and revenue logic
        const totalSales = allItems.filter((item) => item.status === "delivered").length;
        const pendingOrders = allItems.filter((item) => item.status === "pending").length;
        const cancelledOrders = allItems.filter((item) => item.status === "cancelled").length;

        const revenue = allItems
          .filter((item) => item.status === "delivered")
          .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

        setSummary({ totalSales, revenue, pendingOrders, cancelledOrders });

        // 🆕 Show latest 5 items
        const recentItems = allItems.slice(0, 5);
        setItems(recentItems);
      } catch (err) {
        console.error("Dashboard Error:", err);
        toast.error("Failed to fetch dashboard data");
      }
    };

    if (sellerToken) fetchOrders();
  }, [sellerToken]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SalesCard title="Total Sales" value={summary.totalSales} />
        <SalesCard title="Revenue" value={`₹${summary.revenue}`} />
        <SalesCard title="Pending Orders" value={summary.pendingOrders} />
        <SalesCard title="Cancelled Orders" value={summary.cancelledOrders} />
      </div>
      <RecentOrdersTable items={items} />
    </div>
  );
};

export default DashboardHome;
