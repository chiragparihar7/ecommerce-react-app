import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { id: "PROD1", name: "T-Shirt", price: 499, stock: 20, status: "Active" },
    { id: "PROD2", name: "Jeans", price: 999, stock: 10, status: "Inactive" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = () => {
    // In real app, show a form or modal
    
    const newProduct = {
      id: `PROD${products.length + 1}`,
      name: "New Product",
      price: 100,
      stock: 10,
      status: "Active",
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          // onClick={handleAddProduct}
          onClick={() => navigate("/seller/dashboard/add-product")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="px-4 py-2 text-left">Product ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{product.id}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">₹{product.price}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">{product.status}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
