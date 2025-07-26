import React, { useEffect, useState } from "react";
import DataService from "../../../../config/DataService";
import { toast } from "react-toastify";
import { API } from "../../../../config/API";
import {useSelector} from 'react-redux';


const Categorys = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const adminToken = useSelector((state) =>  state.admin.token);


  const fetchCategories = async () => {
    try {
      const response = await DataService(adminToken).get(API.ADMIN_CATEGORY_LIST);
      console.log(response , ":response")
      setCategories(response.data.data);
    } catch (error) {
      console.log("Failed to load categories");
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await DataService(adminToken).post(API.ADMIN_CATEGORY_ADD, {
        name,
        subcategories:description,
      });
      setCategories([...categories, res.data.category]);
      setName("");
      setDescription("");
      toast.success("✅ Category added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await DataService(adminToken).delete(`${API.ADMIN_CATEGORY_REMOVE}/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
      toast.success("🗑️ Deleted successfully");
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">📦 Category Management</h1>

        {/* Add Category Form */}
        <form
          onSubmit={handleAddCategory}
          className="mb-8 bg-white rounded-lg p-6 shadow space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "+ Add Category"}
          </button>
        </form>

        {/* Category Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  #
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Sub Category
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.length > 0 ? (
                categories.map((cat, index) => (
                  <tr key={cat._id} className="border-t border-gray-200">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{cat.name}</td>
                    <td className="px-4 py-3">{cat.subcategories?.toString()}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleRemove(cat._id)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Categorys;
