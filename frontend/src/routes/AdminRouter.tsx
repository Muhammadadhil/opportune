import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboardPage from "@/pages/admin/Dashboard";
import AdminProtected from "@/components/admin/AdminProtected";

function AdminRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route element={<AdminProtected />}>
                    <Route path="/dashboard" element={<AdminDashboardPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default AdminRoute;
