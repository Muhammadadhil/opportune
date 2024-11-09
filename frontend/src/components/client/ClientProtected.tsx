import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "@/store/store";

const ClientPrivateRoute = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);

    return userInfo?.role == "client" ? <Outlet /> : <Navigate to="/login" />;
};

export default ClientPrivateRoute;
