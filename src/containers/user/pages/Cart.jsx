import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.user.token);
  const service = DataService(token);

  const fetchCart = async () => {
    try {
      const res = await DataService(token).get(API.USER_CART_VIEW);
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
      await DataService(token).patch(API.USER_CART_UPDATE(itemId), {
        quantity: newQuantity,
      });
      fetchCart();
    } catch (err) {
      console.error("❌ Failed to update quantity:", err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await DataService(token).delete(API.USER_CART_REMOVE_ITEM(itemId));
      fetchCart();
    } catch (err) {
      console.error("❌ Failed to remove item:", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await DataService(token).delete(API.USER_CART_CLEAR);
      fetchCart();
    } catch (err) {
      console.error("❌ Failed to clear cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(({ ItemId, product, requestedQuantity }) => (
              <div
                key={ItemId}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      product.images?.[0]
                        ? `${API.BASE_URL}/${product.images[0].replace(
                            /^\/+/,
                            ""
                          )}`
                        : "https://via.placeholder.com/300x200"
                    }
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
            ))}
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
