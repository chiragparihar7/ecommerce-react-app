import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const userToken = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await DataService(userToken).get(
          `${API.PRODUCT_DETAILS}/${productId}`
        );
        setProduct(res.data.product);
      } catch (error) {
        console.error(
          "Failed to fetch product list",
          error?.response?.data || error.message
        );
      }
    };

    fetchProducts();
  }, [productId, userToken]);

  const handleAddToCart = async () => {
    if (!userToken) {
      setShowLoginModal(true); // show login popup
      return;
    }

    try {
      await DataService(userToken).post(
        `${API.ADD_TO_CART}`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      toast.success("Added to cart!");
    } catch (error) {
      console.error(
        "Add to cart failed:",
        error?.response?.data || error.message
      );
      toast.error(
        error?.response?.data?.message || "Failed to add item to cart."
      );
    }
  };

  if (!product)
    return (
      <p className="text-center mt-20 text-gray-500">
        Product not found or still loading...
      </p>
    );

  const imageUrl =
    product.images?.length > 0
      ? `${API.BASE_URL}/${product.images[0].replace(/^\/+/, "")}`
      : "https://via.placeholder.com/600x400";

  return (
    <section className="px-4 py-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-sm">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>
          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ₹{product.price}
          </p>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Login Popup Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl transform scale-100 transition-all duration-300 w-[90%] max-w-sm">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M12 8v.01M12 12v.01M12 16v.01M12 20h.01M12 4h.01M8 12h.01M16 12h.01"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Access Denied
              </h2>
              <p className="text-gray-600 mb-6">
                You don't have access. Please login to continue.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
