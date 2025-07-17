import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterFormSchema = Yup.object({
  name: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobileNo: Yup.string()
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
};

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNo: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterFormSchema,
    onSubmit: handleFormSubmission,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="border border-black max-w-md p-5 mx-auto rounded shadow-xl m-5"
    >
      <h1 className="font-bold text-lg mb-4">Register Form</h1>

      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Enter full name"
          className="w-full p-2 border border-black rounded"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Enter email"
          className="w-full p-2 border border-black rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Mobile No</label>
        <input
          id="mobileNo"
          name="mobileNo"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mobileNo}
          placeholder="Enter 10-digit mobile no"
          className="w-full p-2 border border-black rounded"
        />
        {formik.touched.mobileNo && formik.errors.mobileNo && (
          <p className="text-red-500 text-sm">{formik.errors.mobileNo}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Address</label>
        <textarea
          id="address"
          name="address"
          rows="3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          placeholder="Enter address"
          className="w-full p-2 border border-black rounded"
        ></textarea>
        {formik.touched.address && formik.errors.address && (
          <p className="text-red-500 text-sm">{formik.errors.address}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter password"
          className="w-full p-2 border border-black rounded"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          placeholder="Re-enter password"
          className="w-full p-2 border border-black rounded"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {formik.errors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
