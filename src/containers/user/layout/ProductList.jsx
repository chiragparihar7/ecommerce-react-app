import React, { useEffect, useState } from "react";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});
  const userToken = useSelector((state) => state.user.token);

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

  // Add product to cart with quantity 1
  const handleAddToCart = (productId) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: 1,
    }));
  };

  // Increase quantity
  const increment = (productId) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  // Decrease quantity or remove from cart
  const decrement = (productId) => {
    setCartQuantities((prev) => {
      const newQty = (prev[productId] || 1) - 1;
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛍️ Our Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const productId = product._id;
            const quantity = cartQuantities[productId] || 0;

            const imageUrl =
              product.images?.length > 0
                ? `${API.BASE_URL}/${product.images[0].replace(/^\/+/, "")}`
                : "https://via.placeholder.com/300";

            return (
              <div
                key={productId}
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
              >
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm truncate">{product.description}</p>
                <p className="mt-2 text-blue-600 font-bold">₹{product.price}</p>

                {/* Cart Buttons */}
                <div className="mt-4">
                  {quantity === 0 ? (
                    <button
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      onClick={() => handleAddToCart(productId)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-300 px-2 py-1 rounded text-xl"
                        onClick={() => decrement(productId)}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{quantity}</span>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded text-xl"
                        onClick={() => increment(productId)}
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
