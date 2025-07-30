import React, { useEffect, useState } from "react";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const userToken = useSelector((state) => state.user.token);

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

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛍️ Our Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageUrl =
              product.images?.length > 0
                ? `${API.BASE_URL}/${product.images[0].replace(/^\/+/, "")}`
                : "https://via.placeholder.com/300x200";

            return (
              <Link key={product._id} to={`/products/${product._id}`}>
                <div className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition cursor-pointer">
                  <div className="w-full aspect-[4/3] bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
                  <p className="text-blue-600 font-bold mt-1">₹{product.price}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProductList;
