import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../store/store";

const AdminProtected = () => {

    const { isAdminAuthenticated } = useSelector((state: RootState) => state.user);
    console.log("is Admin Authenticated:", isAdminAuthenticated);

    return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminProtected;
