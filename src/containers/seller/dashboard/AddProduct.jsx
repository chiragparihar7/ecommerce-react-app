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
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const sellerToken = useSelector((state) => state.seller.seller.token);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    stock: "",
    price: "",
    selectedImageFile: null,
    imagePreview: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await DataService(sellerToken).get(API.SELLER_CATEGORY_LIST);
        setCategories(categoryRes.data.data);

        if (isEditMode) {
          const productRes = await DataService(sellerToken).get(`${API.SELLER_PRODUCTS_DETAILS}/${id}`);
          const product = productRes.data.product || productRes.data.data?.product;

          if (!product) {
            toast.error("❌ Product not found");
            return;
          }

          setFormData((prev) => ({
            ...prev,
            name: product.name || "",
            description: product.description || "",
            category: product.category?._id || "",
            stock: product.stock?.toString() || "",
            price: product.price?.toString() || "",
            imagePreview: product.image
              ? product.image.startsWith("http")
                ? product.image
                : `${API.BASE_URL}/${product.image}`
              : "",
          }));
        }
      } catch (err) {
        console.error("❌ Error loading form data:", err);
        toast.error("Failed to load data.");
      }
    };

    if (sellerToken) fetchData();
  }, [id, sellerToken, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      selectedImageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };



  const uploadImage = async (productId, file) => {
    const form = new FormData();
    form.append("images", file[0]);
    form.append("id", productId);

    try {
      const res = await DataService(sellerToken).post(API.SELLER_IMAGE_UPLOAD, form);

      if (res.data?.success) {
        toast.success("✅ Image uploaded successfully!");
        return res.data.image; // if your backend returns image URL
      } else {
        toast.error("❌ Image upload failed!");
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      toast.error("❌ Error uploading image");
    }

    return null;
  };

  console.log(formData, ":formData")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find((cat) => cat._id === formData.category);
    if (!selectedCategory) {
      toast.error("⚠️ Please select a valid category");
      return;
    }

    // const productData = {
    //   name: formData.name,
    //   description: formData.description,
    //   categoryId: selectedCategory._id,
    //   stock: formData.stock,
    //   price: formData.price,
    // };

    console.log(formData.selectedImageFile, ":::::Test")

    const productData = new FormData();
    if(isEditMode){
          productData.append('id', id)
    }
    productData.append('name', formData.name)
    productData.append('description', formData.description)
    productData.append('categoryId', selectedCategory._id)
    productData.append('stock', formData.stock)
    productData.append('price', formData.price)
    productData.append('images', formData.selectedImageFile)

    try {
      dispatch(setLoading());

      const res = await DataService(sellerToken).post(API.SELLER_ADD_PRODUCTS, productData, {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      const product = res.data.product;

      dispatch(addProductSuccess(product));
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
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required={!isEditMode}
            />
            {formData.imagePreview && (
              <div className="mt-2">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover border rounded"
                />
              </div>
            )}
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
