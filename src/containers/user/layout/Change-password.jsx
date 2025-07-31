import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { API } from "../../../config/API";
import DataService from "../../../config/DataService";
import "./ChangePassword.css";


const getPasswordStrength = (password) => {
  if (password.length < 6) return { label: "Weak", color: "red" };
  if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^a-zA-Z0-9]/))
    return { label: "Strong", color: "green" };
  return { label: "Medium", color: "orange" };
};



const ChangePassword = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const userToken = useSelector((state) => state.user?.user?.token);

  useEffect(() => {
    if (!userToken && !localStorage.getItem("userToken")) {
      toast.error("Token not found. Please login.");
    }
  }, [userToken]);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm your new password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const token = userToken || localStorage.getItem("userToken");
        if (!token) {
          toast.error("Token not found. Please login.");
          setLoading(false);
          return;
        }

        await DataService(token).post(API.USER_CHANGE_PASSWORD, {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });

        toast.success("✅ Password changed successfully");
        resetForm();
      } catch (error) {
        console.error("Change password failed:", error);
        toast.error(
          error.response?.data?.message || "Failed to change password"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const passwordStrength = getPasswordStrength(formik.values.newPassword);

  return (
    <main className="change-password-main">
      <div className="form-card">
        <h1 className="form-title">Change Password</h1>
        <form className="password-form" onSubmit={formik.handleSubmit}>
          {/* Old Password */}
          <div className="form-group password-group">
            <label htmlFor="oldPassword" className="form-label">
              Current Password
            </label>
            <div className="password-wrapper">
              <input
                type={showOld ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                className="form-input"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span
                className="toggle-password"
                onClick={() => setShowOld(!showOld)}
              >
                {showOld ? "🙈" : "👁️"}
              </span>
            </div>
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <div className="form-error">{formik.errors.oldPassword}</div>
            )}
          </div>

          {/* New Password */}
          <div className="form-group password-group">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <div className="password-wrapper">
              <input
                type={showNew ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="form-input"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span
                className="toggle-password"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? "🙈" : "👁️"}
              </span>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="form-error">{formik.errors.newPassword}</div>
            )}

            {/* Password Strength Meter */}
            {formik.values.newPassword && (
              <div className="mt-1 text-sm" style={{ color: passwordStrength.color }}>
                Strength: {passwordStrength.label}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group password-group">
            <label htmlFor="confirmNewPassword" className="form-label">
              Confirm New Password
            </label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="form-input"
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span
                className="toggle-password"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "🙈" : "👁️"}
              </span>
            </div>
            {formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword && (
                <div className="form-error">
                  {formik.errors.confirmNewPassword}
                </div>
              )}
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
  );
};

export default ChangePassword;
