import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "@/store/store";

const UserProtected = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);

    return userInfo?._id ? <Outlet /> : <Navigate to="/login" />;
};

export default UserProtected;
