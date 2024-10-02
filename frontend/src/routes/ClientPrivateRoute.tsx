import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ClientPrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.user);
    console.log("privateRoute userInfo:", userInfo);

    return userInfo?.role=='client'? <Outlet /> : <Navigate to="/login" />;
};

export default ClientPrivateRoute;
