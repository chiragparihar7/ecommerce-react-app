import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const userToken = useSelector((state) => state.user.token);
  console.log(userToken, "::UserToken");

  const address = JSON.parse(localStorage.getItem("shippingAddress"));

  const fetchCart = async () => {
    try {
      const res = await DataService(userToken).get(API.USER_CART_VIEW);
      if (res.data.success) {
        const items = res.data.data.items;
        setCartItems(items);
        setTotal(res.data.data.meta.totalAmount);
      }
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Optional: send address with order to backend here
      const res = await DataService(userToken).post(API.USER_PLACE_ORDER, {
        shippingAddress: address,
      });

      if (res.data.success) {
        setSuccess(true);
        localStorage.removeItem("shippingAddress");
        // Optional: clear cart in backend if needed
        // await service.delete(API.USER_CART_CLEAR);
      }
    } catch (err) {
      alert("❌ Order failed. Try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!address) {
      alert("Shipping address missing. Redirecting to cart...");
      navigate("/cart");
      return;
    }
    fetchCart();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  if (success) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center p-6 bg-green-100 border border-green-300 rounded-lg">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Order Placed Successfully!
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Thank you for your purchase.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">🧾 Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">📦 Shipping Address</h3>
          <p>
            <strong>Name:</strong> {address.name}
          </p>
          <p>
            <strong>Street:</strong> {address.street}
          </p>
          <p>
            <strong>City:</strong> {address.city}
          </p>
          <p>
            <strong>State:</strong> {address.state}
          </p>
          <p>
            <strong>ZIP:</strong> {address.zip}
          </p>
          <p>
            <strong>Country:</strong> {address.country}
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">🛒 Order Summary</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cartItems.map(({ ItemId, product, requestedQuantity }) => (
              <div
                key={ItemId}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">x {requestedQuantity}</p>
                </div>
                <p>₹{product.price * requestedQuantity}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="flex justify-between text-lg font-semibold">
              <span>Total:</span> <span>₹{total}</span>
            </p>
            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
