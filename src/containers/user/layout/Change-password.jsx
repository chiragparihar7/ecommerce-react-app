import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";
import "./ChangePassword.css";
import { API } from "../../../config/API";
import DataService from "../../../config/DataService";
import { useSelector as useselector } from "react-redux";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const userToken = useselector((state) => state.user?.user?.token);

  useEffect(() => {
    if (!userToken) {
      const localToken = localStorage.getItem("userToken");
      if (!localToken) {
        toast.error("Token not found. Please login.");
      }
    }
  }, [userToken]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);
      const token = userToken || localStorage.getItem("userToken");
      if (!token) {
        toast.error("Token not found. Please login.");
        setLoading(false);
        return;
      }

      const res = await DataService(token).post(API.USER_CHANGE_PASSWORD, {
        oldPassword,
        newPassword,
      });

      toast.success("✅ Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Change password failed:", error);
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="change-password-container">
        <main className="change-password-main">
          <div className="form-card">
            <h1 className="form-title">Change Password</h1>
            <form className="password-form" onSubmit={handleChangePassword}>
              {/* Old Password */}
              <div className="form-group password-group">
                <label htmlFor="current-password" className="form-label">
                  Current Password
                </label>
                <div className="password-wrapper">
                  <input
                    type={showOld ? "text" : "password"}
                    id="current-password"
                    className="form-input"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowOld(!showOld)}
                  >
                    {showOld ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>

              {/* New Password */}
              <div className="form-group password-group">
                <label htmlFor="new-password" className="form-label">
                  New Password
                </label>
                <div className="password-wrapper">
                  <input
                    type={showNew ? "text" : "password"}
                    id="new-password"
                    className="form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowNew(!showNew)}
                  >
                    {showNew ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-group password-group">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm New Password
                </label>
                <div className="password-wrapper">
                  <input
                    type={showConfirm ? "text" : "password"}
                    id="confirm-password"
                    className="form-input"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
