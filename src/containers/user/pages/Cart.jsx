import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const service = DataService(token);

  const fetchCart = async () => {
    try {
      const res = await service.get(API.USER_CART_VIEW);
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

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await service.patch(API.USER_CART_UPDATE(itemId), {
        quantity: newQuantity,
      });
      fetchCart();
    } catch (err) {
      console.error("❌ Failed to update quantity:", err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await service.delete(API.USER_CART_REMOVE_ITEM(itemId));
      fetchCart();
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await service.delete(API.USER_CART_CLEAR);
      fetchCart();
    } catch (err) {
      console.error("❌ Failed to clear cart:", err);
    }
  };

  const handleCheckout = () => {
    const allFilled = Object.values(address).every((val) => val.trim() !== "");
    if (!allFilled) {
      alert("⚠️ Please fill in all shipping address fields.");
      return;
    }

    localStorage.setItem("shippingAddress", JSON.stringify(address));
    navigate("/checkout");
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map(({ ItemId, product, requestedQuantity }) => (
              <div
                key={ItemId}
                className="flex items-start gap-4 p-4 border rounded-lg shadow-sm bg-white"
              >
                <img
                  src={
                    product.images?.[0]
                      ? `${API.BASE_URL}/${product.images[0].replace(/^\/+/, "")}`
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={product.name}
                  className="w-24 h-24 object-contain border rounded-md"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold">{product.name}</h4>
                    <button
                      onClick={() => removeItem(ItemId)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕ Remove
                    </button>
                  </div>
                  <p className="text-blue-600 font-medium">₹{product.price}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded"
                      onClick={() => updateQuantity(ItemId, requestedQuantity - 1)}
                    >
                      −
                    </button>
                    <span className="font-semibold">{requestedQuantity}</span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded"
                      onClick={() => updateQuantity(ItemId, requestedQuantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Address + Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">📦 Shipping Address</h3>
              <div className="space-y-3">
                {["name", "street", "city", "state", "zip", "country"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field[0].toUpperCase() + field.slice(1)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    value={address[field]}
                    onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                  />
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-lg font-bold mb-2">Order Summary</h4>
              <p className="flex justify-between mb-2">
                <span>Items:</span> <span>{cartItems.length}</span>
              </p>
              <p className="flex justify-between font-semibold text-xl">
                <span>Total:</span> <span>₹{total}</span>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleClearCart}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
