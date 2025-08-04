import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

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
        setCartItems(res.data.data.items);
        setTotal(res.data.data.meta.totalAmount);
      }
    } catch (err) {
      console.error("❌ Fetch cart error:", err?.response?.data || err.message);
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
      console.error("❌ Update quantity error:", err?.response?.data || err.message);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await service.delete(API.USER_CART_REMOVE_ITEM(itemId));
      fetchCart();
    } catch (err) {
      console.error("❌ Remove item error:", err?.response?.data || err.message);
    }
  };

  const handleClearCart = async () => {
    try {
      await service.delete(API.USER_CART_CLEAR);
      fetchCart();
    } catch (err) {
      console.error("❌ Clear cart error:", err?.response?.data || err.message);
    }
  };

  const isAddressValid =
    address.name.trim() &&
    address.street.trim() &&
    address.city.trim() &&
    address.state.trim() &&
    address.zip.trim() &&
    address.country.trim();

  const handleCheckout = async () => {
    if (!isAddressValid) return;
    try {
      setIsCheckoutLoading(true);
      const res = await service.post(API.CREATE_ORDER, {
        shippingAddress: address,
      });
      if (res.data.success) {
        navigate("/orders"); // ✅ Fixed navigation path
      }
    } catch (err) {
      console.error("❌ Order creation error:", err?.response?.data || err.message);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(({ ItemId, product, requestedQuantity }) => {
              const imageUrl = product.images?.[0]
                ? product.images[0].startsWith("http")
                  ? product.images[0]
                  : `${API.BASE_URL}/${product.images[0].replace(/^\/+/, "")}`
                : "https://via.placeholder.com/300x200";

              return (
                <div
                  key={ItemId}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-20 h-20 object-contain border rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-blue-600">₹{product.price}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => updateQuantity(ItemId, requestedQuantity - 1)}
                        >
                          -
                        </button>
                        <span>{requestedQuantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() => updateQuantity(ItemId, requestedQuantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(ItemId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* Address Form */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border rounded-md p-2"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Street"
              className="border rounded-md p-2"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              className="border rounded-md p-2"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              className="border rounded-md p-2"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
            />
            <input
              type="text"
              placeholder="ZIP"
              className="border rounded-md p-2"
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            />
            <input
              type="text"
              placeholder="Country"
              className="border rounded-md p-2"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
            />
          </div>

          {/* Actions */}
          <div className="mt-6 text-right">
            <p className="text-lg font-bold mb-2">Total: ₹{total}</p>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded mr-2"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button
              className={`px-4 py-2 rounded text-white ${
                isAddressValid ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isAddressValid || isCheckoutLoading}
              onClick={handleCheckout}
            >
              {isCheckoutLoading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
