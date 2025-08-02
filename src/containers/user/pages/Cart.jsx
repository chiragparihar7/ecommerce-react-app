import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.user.token);
  const api = DataService(token);

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchCart = async () => {
    try {
      const res = await api.get(API.VIEW_CART, headers);
      console.log("Cart Items Response:", res.data);
      if (res.data.success) {
        const items = res.data.data.items;
        setCartItems(items);
        setTotal(res.data.data.meta.totalAmount);
      }
    } catch (err) {
      console.error(
        "Failed to fetch cart:",
        err?.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      await api.patch(`${API.UPDATE_CART_ITEM}/${itemId}`, {
        quantity: newQuantity,
      });
      fetchCart();
    } catch (err) {
      console.error(
        "Failed to update quantity:",
        err?.response?.data || err.message
      );
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`${API.REMOVE_CART_ITEM}/${itemId}`, headers);
      fetchCart();
    } catch (err) {
      console.error(
        "Failed to remove item:",
        err?.response?.data || err.message
      );
    }
  };

  const handleClearCart = async () => {
    try {
      await api.delete(API.CLEAR_CART, headers);
      fetchCart();
    } catch (err) {
      console.error(
        "Failed to clear cart:",
        err?.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(({ ItemId, product, requestedQuantity }) => {
              const imageUrl = product.images[0]?.startsWith("http")
                ? product.images[0]
                : `${API.BASE_URL}${product.images[0]}`;

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
                          onClick={() =>
                            updateQuantity(ItemId, requestedQuantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{requestedQuantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded"
                          onClick={() =>
                            updateQuantity(ItemId, requestedQuantity + 1)
                          }
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

          <div className="mt-6 text-right">
            <p className="text-lg font-bold mb-2">Total: ₹{total}</p>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded mr-2"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
