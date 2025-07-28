// src/containers/admin/pages/seller/SellerManagement.jsx
import React, { useEffect, useState } from "react";
import DataService from "../../../../config/DataService";
import { API } from "../../../../config/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SellerManagement = () => {
  const [sellers, setSellers] = useState([]);
  const adminToken = useSelector((state) => state.admin.token);
console.log(adminToken, ":::adminToken")
  const fetchSellers = async () => {
    try {
      const response = await DataService(adminToken).get(API.ADMIN_SELLER_LIST);
      setSellers(response.data.sellers || []);
    } catch (error) {
      toast.error("Failed to fetch sellers");
    }
  };

  const toggleStatus = async (sellerId) => {
    try {
      const res = await DataService(adminToken).patch(
        `${API.ADMIN_TOGGLE_SELLER_STATUS}/${sellerId}`
      );

      toast.success(res.data.message || "Status updated");
      fetchSellers(); // Refresh list
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteSeller = async (sellerId) => {
    const confirm = window.confirm("Are you sure you want to delete this seller?");
    if (!confirm) return;

    try {
      await DataService(adminToken).delete(`${API.ADMIN_DELETE_SELLER}/${sellerId}`);
      toast.success("Seller deleted successfully");
      setSellers((prev) => prev.filter((s) => s._id !== sellerId));
    } catch (error) {
      toast.error("Failed to delete seller");
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛍️ Seller Management</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length > 0 ? (
              sellers.map((seller, index) => (
                <tr key={seller._id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{seller.name}</td>
                  <td className="px-4 py-2">{seller.email}</td>
                  <td className="px-4 py-2">
                    {seller?.isBlocked ? (
                      <span className="text-red-600 font-medium">Blocked</span>
                    ) : (
                      <span className="text-green-600 font-medium">Active</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-3">
                    <button
                      onClick={() => toggleStatus(seller._id)}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      {seller?.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => handleDeleteSeller(seller._id)}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No sellers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerManagement;
