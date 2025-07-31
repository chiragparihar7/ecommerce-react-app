import React, { useEffect, useState } from "react";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});
  const userToken = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await DataService(userToken).get(API.USER_GET_ALL_PRODUCTS);
        console.log("Products fetched:", res.data);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("❌ Failed to fetch products", error?.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [userToken]);

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: 1, 
    }));
  };

  const increment = (e, productId) => {
    e.stopPropagation();
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decrement = (e, productId) => {
    e.stopPropagation();
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
            const quantity = cartQuantities[product._id] || 0;
            const imageUrl =
              product.images?.length > 0
                ? `${API.BASE_URL}/${product.images[0].replace(/^\/+/, "")}`
                : "https://via.placeholder.com/300x200";

            return (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition cursor-pointer"
              >
                {/* Clickable area (image + name) */}
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

                {/* Cart Buttons */}
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
  