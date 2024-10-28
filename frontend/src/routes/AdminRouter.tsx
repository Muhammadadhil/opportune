import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboardPage from "@/pages/admin/Dashboard";

function AdminRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/dashboard" element={<AdminDashboardPage />} />
            </Routes>
        </>
    );
}

export default AdminRoute;
