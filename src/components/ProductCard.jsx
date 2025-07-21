import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ image, title, price, oldPrice, description, likedByUser }) => {
  const [liked, setLiked] = useState(likedByUser);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-[300px] transition hover:shadow-xl">
      {/* Product Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        {/* Like Icon */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
        >
          <FaHeart className={`text-xl ${liked ? "text-red-500" : "text-gray-300"}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        
        <div className="mt-2 mb-2 text-base text-gray-700">
          <span className="font-bold">{price}$</span>
          <span className="line-through text-gray-400 ml-2">{oldPrice}$</span>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {description}
        </p>

        <button className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-black transition">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
