import AdminSidebar from "@/components/admin/AdminSidebar";
import Dashboard from "@/components/admin/Dashboard";
import Categories from "@/components/admin/Categories"; 
import TopBar from "@/components/admin/AdminNavbar";
import { useState } from "react";

export default function AdminDashboardPage() {
    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div className="flex h-screen bg-gray-50">
            <AdminSidebar onPageChange={setActivePage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar />
                <div className="flex-1 overflow-auto">
                    {activePage === "dashboard" && <Dashboard />}
                    {activePage === "categories" && <Categories />}
                </div>
            </div>
        </div>
    );
}
