import React, { useEffect, useState } from "react";

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

const DashboardHome = () => {
  const [summary, setSummary] = useState({});
  const [orders, setOrders] = useState([]);

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
    ]);
  }, []);

  return (
    <div className="p-6">
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
};

export default DashboardHome;
