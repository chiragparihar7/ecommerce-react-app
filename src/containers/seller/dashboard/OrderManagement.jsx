import React, { useEffect, useState } from "react";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderManagement = () => {
  const sellerToken = useSelector((state) => state.seller.seller.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await DataService(sellerToken).get(API.SELLER_ALL_ORDERS);
        setOrders(
          (res.data.orders || []).map((order) => ({
            ...order,
            _id: order.orderId,
            items: order.items.map((item) => ({
              ...item,
              _id: item.itemId,
            })),
          }))
        );
      } catch (error) {
        console.error("Error fetching orders", error);
        toast.error("Failed to load orders");
      }
    };

    if (sellerToken) fetchOrders();
  }, [sellerToken]);

  const handleStatusChange = async (orderId, itemId, newStatus) => {
    try {
      const res = await DataService(sellerToken).post(
        API.SELLER_UPDATE_ORDER_STATUS(orderId),
        { status: newStatus }
      );
      if (res.data.success) {
        toast.success("Status updated successfully");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  items: order.items.map((item) =>
                    item._id === itemId ? { ...item, status: newStatus } : item
                  ),
                }
              : order
          )
        );
      } else {
        toast.error(res.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update order status", error?.response?.data || error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure to delete this order?")) {
      try {
        const res = await DataService(sellerToken).delete(
          API.SELLER_DELETE_ORDER(orderId)
        );
        if (res.data.success) {
          toast.success("Order deleted successfully");
          setOrders((prev) => prev.filter((order) => order._id !== orderId));
        } else {
          toast.error("Failed to delete order");
        }
      } catch (err) {
        toast.error("Error deleting order");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Payment</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {orders.map((order, index) =>
              <tr key={`${order._id}`}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{order.user || "N/A"}</td>
                <td className="px-4 py-2">{order.paymentMethod || "N/A"}</td>
                <td className="px-4 py-2">₹{order.totalAmount || 0}</td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.orderId, item.itemId, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(order.orderId)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
