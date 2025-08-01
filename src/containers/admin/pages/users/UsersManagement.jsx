import React, { useEffect, useState } from "react";
import DataService from "../../../../config/DataService";
import { API } from "../../../../config/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./UsersManagement.css"; // Import CSS

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const adminToken = useSelector((state) => state.admin.token);

  const fetchUsers = async () => {
    try {
      const res = await DataService(adminToken).get(API.ADMIN_ALL_USERS);
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Fetch users failed:", error?.response?.data || error.message);
      toast.error("Failed to fetch users");
    }
  };

  const toggleStatus = async (userId) => {
    try {
      const res = await DataService(adminToken).patch(API.ADMIN_TOGGLE_USER_STATUS(userId));
      toast.success(res.data.message || "User status updated");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-container">
      <h1 className="user-title">User Management</h1>
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={user?.isBlocked ? "status-blocked" : "status-active"}>
                      {user?.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleStatus(user._id)}
                      className="status-button"
                    >
                      {user?.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
