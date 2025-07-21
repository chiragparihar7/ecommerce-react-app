// src/containers/seller/dashboard/OrderManagement.jsx

import React, { useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "Alice",
      total: 1500,
      status: "Pending",
    },
    {
      id: "ORD002",
      customer: "Bob",
      total: 999,
      status: "Shipped",
    },
    {
      id: "ORD003",
      customer: "Charlie",
      total: 1200,
      status: "Delivered",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="px-4 py-2 text-left">Order ID</th>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.customer}</td>
              <td className="px-4 py-2">₹{order.total}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2 space-x-2">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="text-red-600 hover:underline ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
