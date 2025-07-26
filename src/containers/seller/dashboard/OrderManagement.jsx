import React, { useEffect, useState } from "react";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderManagement = () => {
  const sellerToken = useSelector((state) => state.seller.seller.token);
  const [orders, setOrders] = useState([]);

  // Fetch orders on load
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await DataService(sellerToken).get(API.SELLER_ALL_ORDERS);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders", error);
        toast.error("Failed to load orders");
      }
    };

    if (sellerToken) fetchOrders();
  }, [sellerToken]);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );

    // (Optional) Send API to backend for updating status
    // You can use API.SELLER_UPDATE_ORDER_STATUS
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this order?")) {
      setOrders((prev) => prev.filter((order) => order._id !== id));
      // (Optional) Call delete API if implemented
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
            <tr key={order._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{order._id}</td>
              <td className="px-4 py-2">{order.customerName || "N/A"}</td>
              <td className="px-4 py-2">₹{order.totalAmount || 0}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2 space-x-2">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => handleDelete(order._id)}
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
