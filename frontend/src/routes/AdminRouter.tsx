import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboardPage from "@/pages/admin/DashboardPage";
import AdminProtected from "@/components/admin/AdminProtected";
import Categories from "@/components/admin/Categories";

function AdminRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route element={<AdminProtected />}>
                    <Route path="/dashboard" element={<AdminDashboardPage />} />
                    <Route path="/categories" element={<Categories />} />
                </Route>
            </Routes>
        </>
    );
}

export default AdminRoute;

