// src/components/ProductList.jsx
import React, { use, useEffect, useState } from "react";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const userToken = useSelector((state) => state.user.token);
  // console.log(userToken, ":::userToken")
  const fetchProducts = async () => {
    try {
      const res = await DataService(userToken).get(API.USER_GET_ALL_PRODUCTS);
      console.log(res, ":::res");
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛍️ Our Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
            >
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm truncate">
                {product.description}
              </p>
              <p className="mt-2 text-blue-600 font-bold">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
