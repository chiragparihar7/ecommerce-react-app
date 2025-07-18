import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginFormSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const handleLogin = (values) => {
  console.log("Login Successful", values);
};

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginFormSchema,
    onSubmit: handleLogin,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="border border-black max-w-md p-5 mx-auto rounded shadow-xl m-5"
    >
      <h1 className="font-bold text-lg mb-4">Login Form</h1>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Enter your email"
          className="w-full p-2 border border-black rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
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
          placeholder="Enter your password"
          className="w-full p-2 border border-black rounded"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}
      >
        Login
      </button>
      <p className="mt-4 text-sm">
        Don't have an account? <a href="/Register" className="text-blue-500">Register here</a>
        </p>
    </form>
  );
};

export default Login;
