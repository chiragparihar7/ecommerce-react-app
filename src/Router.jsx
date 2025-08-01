import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./containers/user/auth/login/Login.jsx";
import Register from "./containers/user/auth/register/Register.jsx";
import Home from "./containers/user/pages/Home.jsx";
import SellerRegister from "./containers/seller/auth/Register.jsx";
import SellerLogin from "./containers/seller/auth/Login.jsx";
import SellerDashboard from "./containers/seller/dashboard/Dashboard.jsx";
import DashboardHome from "./containers/seller/dashboard/DashboardHome.jsx";
import ProductManagement from "./containers/seller/dashboard/ProductManagement.jsx";
import AddProduct from "./containers/seller/dashboard/AddProduct.jsx";
import Categorys from "./containers/admin/pages/category/Categorys.jsx";
import AdminLogin from "./containers/admin/auth/login/Login.jsx";
import OrderManagement from "./containers/seller/dashboard/OrderManagement.jsx";
import Profile from "./containers/user/pages/Profile.jsx";
import ProductList from "./containers/user/layout/ProductList.jsx";
import AdminDashboard from "./containers/admin/pages/dashboard/AdminDashboard";
import DashboardHomeAdmin from "./containers/admin/pages/dashboard/DashboardHome";
import SellerManagement from "./containers/admin/pages/seller/SellerManagement";
import ChangePassword from "./containers/user/layout/Change-password.jsx";
import UserLayout from "./containers/user/layout/UserLayout.jsx";
import ProductDetail from './containers/user/pages/ProductDetails.jsx';
import Cart from './containers/user/pages/Cart.jsx';
import UsersManagement from "./containers/admin/pages/users/UsersManagement.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Seller Routes */}
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<DashboardHomeAdmin />} />
          <Route path="categorys" element={<Categorys />} />
          <Route path="sellers" element={<SellerManagement />} />
          <Route path="users" element={<UsersManagement />}/>
        </Route>

        {/* User Layout (with Header/Footer) */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
