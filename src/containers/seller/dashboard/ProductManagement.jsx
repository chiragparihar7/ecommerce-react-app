import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductManagement = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const sellerToken = useSelector((state) => state.seller.seller.token);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await DataService(sellerToken).get(API.SELLER_PRODUCTS);
        console.log("Fetched products:", res.data.products); // For Debugging
        setProducts(res.data.products);
      } catch (error) {
        console.log("Failed to load products", error);
      }
    };
    fetchProducts();
  }, [sellerToken]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        await DataService(sellerToken).delete(`${API.SELLER_PRODUCTS}/${id}`);
        setProducts(products.filter((p) => p.productId !== id)); // Use productId if API returns that
        toast.success("✅ Product deleted successfully");
      } catch (error) {
        console.error("❌ Failed to delete product", error);
        toast.error("❌ Failed to delete product");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={() => navigate("/seller/dashboard/add-product")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {products.map((product, i) => (
            <tr key={product.productId} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{i + 1}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">₹{product.price}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">
                {product.isActive ? "Active" : "Inactive"}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() =>
                    navigate(
                      `/seller/dashboard/edit-product/${product.productId}`
                    )
                  }
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product.productId)}
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
