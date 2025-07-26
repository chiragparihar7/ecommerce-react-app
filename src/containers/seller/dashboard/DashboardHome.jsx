import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../../config/API";
import DataService from "../../../config/DataService";
import { toast } from "react-toastify";

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
          <tr key={order._id} className="border-b">
            <td className="p-2">{order._id}</td>
            <td className="p-2">{order.user?.name || "N/A"}</td>
            <td className="p-2 text-yellow-600">{order.status}</td>
            <td className="p-2">₹{order.totalPrice}</td>
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

  const [orders, setOrders] = useState([]);

  const sellerToken = useSelector((state) => state.seller.seller.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await DataService(sellerToken).get(API.SELLER_ALL_ORDERS);
        const allOrders = res.data.orders || [];

        const totalSales = allOrders.filter(o => o.status === "Delivered").length;
        const pendingOrders = allOrders.filter(o => o.status === "Pending").length;
        const cancelledOrders = allOrders.filter(o => o.status === "Cancelled").length;
        const revenue = allOrders
          .filter(o => o.status === "Delivered")
          .reduce((sum, order) => sum + order.totalPrice, 0);

        setSummary({ totalSales, revenue, pendingOrders, cancelledOrders });

        const recentOrders = allOrders.slice(0, 5); // show latest 5
        setOrders(recentOrders);
      } catch (err) {
        toast.error("Failed to fetch orders for dashboard");
      }
    };

    if (sellerToken) {
      fetchOrders();
    }
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
      <RecentOrdersTable orders={orders} />
    </div>
  );
};

export default DashboardHome;
