import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerPrivateRoute = () => {
  const isAuthenticated = useSelector((state) => !!state.seller?.seller?.token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/seller/login" replace />;
};

export default SellerPrivateRoute;
