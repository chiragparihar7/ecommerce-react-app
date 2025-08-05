import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivateRoute = () => {
  const isAuthenticated = useSelector((state) => !!state.admin?.token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;
