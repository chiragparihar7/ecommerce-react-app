import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  setLoading,
  addProductSuccess,
  productError,
} from "../../../redux/slices/sellerProductSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // edit mode if id exists
  const isEditMode = Boolean(id);
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
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryRes = await DataService(sellerToken).get(API.SELLER_CATEGORY_LIST);
        setCategories(categoryRes.data.data);

        // Fetch product details if in edit mode
        if (isEditMode) {
          const productRes = await DataService(sellerToken).get(
            `${API.SELLER_PRODUCTS_DETAILS}/${id}`
          );

          const product = productRes.data.product || productRes.data.data?.product;

          if (!product) {
            toast.error("❌ Product not found");
            return;
          }

          setFormData({
            name: product.name || "",
            description: product.description || "",
            category: product.category?._id || "",
            stock: product.stock?.toString() || "",
            price: product.price?.toString() || "",
            image: null,
          });
        }
      } catch (err) {
        console.error("❌ Error loading form data:", err);
        toast.error("Failed to load data.");
      }
    };

    if (sellerToken) fetchData();
  }, [id, sellerToken, isEditMode]);

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
      toast.error("⚠️ Please select a valid category");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("categoryId", selectedCategory._id);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      dispatch(setLoading());

      const endpoint = isEditMode
        ? `${API.SELLER_PRODUCTS}/${id}` // update
        : API.SELLER_ADD_PRODUCTS;       // create

      const method = "post"; // both creation & update use POST

      const res = await DataService(sellerToken)[method](endpoint, data);

      dispatch(addProductSuccess(res.data.product));
      toast.success(`✅ Product ${isEditMode ? "updated" : "added"} successfully!`);
      navigate("/seller/dashboard/products");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      dispatch(productError(message));
      toast.error(`❌ Failed to ${isEditMode ? "update" : "add"} product`);
    }
  };

  return (
    <div className="p-6 m-10 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
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
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required={!isEditMode}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
