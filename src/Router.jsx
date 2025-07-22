import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./containers/user/auth/login/Login.jsx";
import Register from "./containers/user/auth/register/Register.jsx";
import Home from "./containers/user/pages/Home.jsx";
import SellerRegister from "./containers/seller/auth/Register.jsx";
import SellerLogin from "./containers/seller/auth/Login.jsx";
import SellerDashboard from './containers/seller/dashboard/Dashboard.jsx';
import DashboardHome from './containers/seller/dashboard/DashboardHome.jsx';
import ProductManagement from './containers/seller/dashboard/ProductManagement.jsx';
import AddProduct from './containers/seller/dashboard/AddProduct.jsx';
import Categorys from './containers/admin/pages/category/Categorys.jsx';
import AdminLogin from "./containers/admin/auth/login/Login.jsx";
import AdminDashboard from "./containers/admin/pages/dashboard/Dashboard.jsx";
import OrderManagement from './containers/seller/dashboard/OrderManagement.jsx';

import Profile from './containers/user/pages/Profile.jsx';
import ProductList from './containers/user/pages/ProductList.jsx';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='productlist' element={<ProductList />} />

        {/* Seller Routes */}
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductManagement />} />
          {/* Add Product Route */}
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/categorys" element={<Categorys />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
