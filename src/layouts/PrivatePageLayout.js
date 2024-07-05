import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { projectAuth } from "../Firebase";

const PrivatPageLayout = () => {
  const location = useLocation();
  return projectAuth.currentUser ? <Outlet /> : <Navigate to="/" state={{from:location}} replace/>;
};

export default PrivatPageLayout;
