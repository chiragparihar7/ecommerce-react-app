import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  setLoading,
  addProductSuccess,
  productError,
} from "../../../redux/slices/sellerProductSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sellerToken = useSelector((state) => state.seller.seller.token);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    stock: "",
    price: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await DataService(sellerToken).get(
          API.SELLER_CATEGORY_LIST
        );
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to load categories", err);
        toast.error("⚠️ Failed to load categories");
      }
    };

    fetchCategories();
  }, [sellerToken]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      (cat) => cat._id === formData.category
    );

    if (!selectedCategory) {
      toast.error("⚠️ Invalid category selected");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category._id", selectedCategory._id); // ✅ FIXED
    data.append("category.name", selectedCategory.name); // ✅ FIXED
    data.append("stock", formData.stock);
    data.append("price", formData.price);
    data.append("image", formData.image);

    try {
      dispatch(setLoading());

      const res = await DataService(sellerToken).post(
        API.SELLER_PRODUCTS,
        data
      );

      dispatch(addProductSuccess(res.data.product));
      toast.success("✅ Product added successfully!");
      navigate("/seller/dashboard/products");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      dispatch(productError(message));
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <div className="p-6 m-10 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
