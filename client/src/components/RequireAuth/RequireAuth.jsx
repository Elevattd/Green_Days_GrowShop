// import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
// import { selectCurrentToken } from "../../features/auth/authSlice";
import { selectIsLoading } from "../../features/ui/uiSlice";
import Loader from "../Loader/Loader";

const RequireAuth = () => {
  const loading = useSelector(selectIsLoading);

  if (loading) {
    return <Loader />;
  }

  return <Outlet />;
};

export default RequireAuth;
