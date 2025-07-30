import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector, } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const userToken = useSelector((state) => state.user.token);
  const navigate = useNavigate();


  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await DataService(userToken).get(`${API.PRODUCT_DETAILS}/${productId}`);

        console.log(res.data.product, ":res")
        setProduct(res.data.product);
      } catch (error) {
        console.error("Failed to fetch product list", error?.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [productId, userToken]);

const handleAddToCart = async () => {
  if (!userToken) {
    toast.error("Please log in to add items to your cart.");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/cart/addIn",
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
    
    navigate("/cart");
  } catch (error) {
    console.error("Add to cart failed:", error?.response?.data || error.message);
    toast.error(
      error?.response?.data?.message || "Failed to add item to cart."
    );
  }
};



  if (!product)
    return <p className="text-center mt-20 text-gray-500">Product not found or still loading...</p>;

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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-6">₹{product.price}</p>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
