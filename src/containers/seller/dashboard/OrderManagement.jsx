import React, { useEffect, useState } from "react";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderManagement = () => {
  const sellerToken = useSelector((state) => state.seller.seller.token);
  const [orders, setOrders] = useState([]);

  // ✅ Fetch orders on load
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

  // ✅ Update item status (API call + local state update)
  const handleStatusChange = async (orderId, itemId, newStatus) => {
    console.log("Updating status for:", { orderId, itemId, newStatus });

    try {
      const res = await DataService(sellerToken).patch(
        API.SELLER_UPDATE_ORDER_STATUS(orderId, itemId),
        { status: newStatus }
      );
      console.log("🧪 Status Update Triggered:", {
        orderId,
        itemId,
        newStatus,
      });
      if (res.data.success) {
        toast.success("Status updated successfully");

        // ✅ Update local state for that specific item
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
      console.error(
        "Failed to update order status",
        error?.response?.data || error
      );
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  // ✅ Optional delete function (local only unless backend API exists)
  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure to delete this order?")) {
      try {
        const res = await DataService(sellerToken).delete(
          API.SELLER_DELETE_ORDER(orderId)
        );
        if (res.data.success) {
          toast.success("Order Delete Successfully");
          setOrders((prev) => prev.filter((order) => order._id !== orderId));
        } else {
          toast.error("Failed To delete order");
        }
      } catch (err) {
        toast.error("Error Deleting Order");
      }
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
            <th className="px-4 py-2 text-left">Item</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {orders.map((order, index) =>
            order.items.map((item, itemIndex) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{index + 1}</td> {/* Serial number */}
                <td className="px-4 py-2">{order.user || "N/A"}</td>
                <td className="px-4 py-2">
                  {item.productName || "Unnamed Item"}
                </td>
                <td className="px-4 py-2">₹{item.price || 0}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">₹{item.quantity * item.price}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.orderId,
                        item.itemId,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => handleDelete(order.orderId)}
                    className="text-red-600 hover:underline ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
