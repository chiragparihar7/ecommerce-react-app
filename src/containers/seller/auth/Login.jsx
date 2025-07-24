import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  registerSuccess,
  loginSuccess,
  authFailed,
  sellerLogout,
} from "../../../redux/slices/sellerSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { seller, loading, error } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 6 characters long"
        )
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      dispatch(setLoading());
      try {
        const response = await DataService().post(API.SELLER_LOGIN, values);
        dispatch(
          loginSuccess({
            seller: response.data.seller,
            token: response.data.token,
          })
        );

        toast.success("Login Successful!");
        navigate("/seller/dashboard");
      } catch (error) {
        const message = error.response?.data?.message || "Login failed";
        dispatch(authFailed({ error: message }));
        toast.error(message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Seller Login
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full py-2 px-3 border rounded-md bg-white focus:outline-none ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field with Eye Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full py-2 px-3 pr-12 border rounded-md bg-white focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-0 right-0 h-full px-3 flex items-center cursor-pointer border-l border-gray-300 text-gray-500"
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </div>
          {/* Added Register Link Here*/}

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/seller/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
