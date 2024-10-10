import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";   


function AdminRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
            </Routes>
        </>
    );
}

export default AdminRoute;
