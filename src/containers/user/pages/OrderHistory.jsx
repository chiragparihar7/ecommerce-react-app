import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { toast } from "react-toastify"; // ✅ using your existing toast system

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((state) => state.user.token);

  const fetchOrders = async () => {
    try {
      const res = await DataService(userToken).get(API.USER_ORDER_HISTORY);
      if (res.data.success && Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        toast.warn("⚠️ No orders found.");
      }
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err);
      toast.error("Failed to load order history.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await DataService(userToken).put(API.USER_ORDER_CANCEL(orderId));
      if (res.data.success) {
        toast.success("✅ Order cancelled successfully.");
        // Instant update in UI without reload
        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === orderId ? { ...order, status: "Cancelled" } : order
          )
        );
      } else {
        toast.error("❌ Could not cancel the order.");
      }
    } catch (err) {
      console.error("❌ Error cancelling order:", err);
      toast.error("Something went wrong while cancelling.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading orders...</p>;

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order.orderId || index}
              className="p-4 border rounded shadow bg-white"
            >
              <p className="font-semibold text-lg mb-2">Order #{index + 1}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    order.status === "Cancelled" ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </p>

              <div className="mt-3">
                <p className="font-semibold">Items:</p>
                {Array.isArray(order.products) && order.products.length > 0 ? (
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    {order.products.map((item, i) => (
                      <li key={i}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No items in this order.</p>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="font-semibold text-lg">
                  Total: ₹{order.totalAmount}
                </p>

                {order.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelOrder(order.orderId)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
