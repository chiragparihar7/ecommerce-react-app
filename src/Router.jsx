import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./containers/user/auth/login/Login.jsx";
import Register from "./containers/user/auth/register/Register.jsx";
import Home from "./containers/user/pages/Home.jsx";
import SellerRegister from "./containers/seller/auth/Register.jsx";
import SellerLogin from "./containers/seller/auth/Login.jsx";
import AdminLogin from "./containers/admin/auth/login/Login.jsx";
import AdminDashboard from "./containers/admin/pages/dashboard/Dashboard.jsx";
import SellerDashboard from "./containers/seller/dashboard/Dashboard.jsx";
import DashboardHome from "./containers/seller/dashboard/DashboardHome.jsx";
import ProductManagement from "./containers/seller/dashboard/ProductManagement.jsx";
import AddProduct from "./containers/seller/dashboard/AddProduct.jsx";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        {/* Seller Routes */}
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
