import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    stock: "",
    price: "",
    image: null,
  });

  const categories = ["T-Shirts", "Jeans", "Shoes", "Accessories"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Product:", formData);
    alert("Product added successfully!");
    // TODO: Handle backend API call
  };

  return (
    <div className="p-6 m-10 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Product Name + Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
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
            <label className="block text-sm font-medium mb-1">Description</label>
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

        {/* Row 2: Category + Stock */}
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
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
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

        {/* Row 3: Price + Image */}
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
            <label className="block text-sm font-medium mb-1">Upload Image</label>
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
