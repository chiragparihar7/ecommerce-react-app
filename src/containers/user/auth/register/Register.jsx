import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../../utils/axiosInstance";


const RegisterFormSchema = Yup.object({
  name: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  address: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Address is required"),
  password: Yup.string()
    .min(8, "Password should have min 8 characters.")
    .matches(/[a-zA-Z]/, "Password must contain letters")
    .matches(/\d/, "Password must contain numbers")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required."),
});

const handleFormSubmission = (values) => {
  console.log("Successful form submission", values);
  try {
    const res =  axiosInstance.post("/user/signup", values);
    alert("Registration Successful!");
    console.log("Response:", res.data);
  } catch (error) {
    alert("Registration Failed!");
    console.log(error.response?.data?.message || "Something went wrong");
  }
};

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterFormSchema,
    onSubmit: handleFormSubmission,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-5xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Enter full name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Mobile No</label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              placeholder="Enter 10-digit mobile no"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              placeholder="Enter address"
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="Re-enter password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
