import React from "react";
// import { Route, useN } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

const checkAuthentication = () => {
  const admin = sessionStorage.getItem("admin");
  return admin;
};

const AdminAuthRoute = ({ element }) => {
  const isAuthenticated = checkAuthentication();
  console.log({ element });

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminAuthRoute;
