import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { toast } from "react-toastify";
const Profile = () => {
  const token = useSelector((state) => state.user?.user?.token);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  // Fetch user profile data on mount
  const fetchProfile = async () => {
    try {
      const res = await DataService(token).get(API.USER_PROFILE);
      console.log("Profile Response", res.data);
      const { name, email, mobile, address } = res.data.user;
      setFormData({ name, email, mobile, address });
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit updated data (excluding email)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { name, mobile, address } = formData; // exclude email
      const res = await DataService(token).post(API.USER_PROFILE_UPDATE, {
        name,
        mobile,
        address,
      });

      console.log("Profile updated successfully:", res.data);
      toast.success("Profile updated!");
      fetchProfile(); // refresh profile after update
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          User Profile
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["name", "email", "mobile", "address"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={field === "email"} // make email read-only
                  className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400 ${
                    field === "email" ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold"
            >
              {loading ? "Updating..." : "Edit Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
