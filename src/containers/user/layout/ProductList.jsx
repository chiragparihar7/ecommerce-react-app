import React, { useEffect, useState } from "react";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import { useNavigate, Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
>>>>>>> c84a955ad6ea777d487bc6e3e979e1542eed920c

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});
  const userToken = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await DataService(userToken).get(API.USER_GET_ALL_PRODUCTS);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("❌ Failed to fetch products", error?.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [userToken]);

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    try {
      const res = await DataService(userToken).post(API.ADD_TO_CART, {
        productId,
        quantity: 1,
      });

      // Save cart item ID (optional if your backend returns it)
      const itemId = res.data.cartItemId || productId;

      setCartQuantities((prev) => ({
        ...prev,
        [productId]: { quantity: 1, itemId }, // Track itemId for updates
      }));
    } catch (error) {
      console.error("❌ Add to cart failed:", error.response?.data || error.message);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const itemId = cartQuantities[productId]?.itemId || productId;

    try {
      await DataService(userToken).put(`/cart/${itemId}`, {
        quantity: newQuantity,
      });

      setCartQuantities((prev) => ({
        ...prev,
        [productId]: {
          ...(prev[productId] || {}),
          quantity: newQuantity,
        },
      }));
    } catch (error) {
      console.error("❌ Failed to update quantity:", error.response?.data || error.message);
    }
  };

  const increment = (e, productId) => {
    e.stopPropagation();
    const currentQty = cartQuantities[productId]?.quantity || 1;
    updateQuantity(productId, currentQty + 1);
  };

  const decrement = (e, productId) => {
    e.stopPropagation();
    const currentQty = cartQuantities[productId]?.quantity || 1;
    if (currentQty > 1) {
      updateQuantity(productId, currentQty - 1);
    }
  };

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛍️ Our Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const quantity = cartQuantities[product._id]?.quantity || 0;
            const imageUrl =
              product.images?.length > 0
                ? `${API.BASE_URL}/${product.images[0].replace(/^\/+/, "")}`
                : "https://via.placeholder.com/300x200";

            return (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition cursor-pointer"
              >
                <Link to={`/products/${product._id}`}>
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold hover:underline">{product.name}</h3>
                </Link>

                <p className="text-gray-600 text-sm truncate">{product.description}</p>
                <p className="mt-2 text-blue-600 font-bold">₹{product.price}</p>

                <div className="mt-4">
                  {quantity === 0 ? (
                    <button
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      onClick={(e) => handleAddToCart(e, product._id)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-300 px-2 py-1 rounded text-xl"
                        onClick={(e) => decrement(e, product._id)}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{quantity}</span>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded text-xl"
                        onClick={(e) => increment(e, product._id)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProductList;
<<<<<<< HEAD
=======
  
>>>>>>> c84a955ad6ea777d487bc6e3e979e1542eed920c
