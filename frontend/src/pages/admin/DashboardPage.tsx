import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Dashboard from "@/components/admin/Dashboard";
import Categories from "@/components/admin/Categories";
// import Users from "@/components/admin/Users";
// import Payments from "@/components/admin/Payments";
// import Notifications from "@/components/admin/Notifications";
import TopBar from "@/components/admin/AdminNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import UserList from '@/components/admin/UsersList';
import { PaymentListing } from "@/components/admin/Payments";
import AdminJobList from "@/components/admin/AdminJobList";
import ManageNotifcation from "@/components/admin/ManageNotifcation";

export default function AdminDashboardPage() {
    const [activePage, setActivePage] = useState("dashboard");

    const renderActivePage = () => {
        switch (activePage) {
            case "dashboard":
                return <Dashboard />;
            case "users":
                return <UserList />;
            case "jobs":
                return <AdminJobList />;
            case "payments":
                return <Categories />;
            case "categories":
                return <Categories />;
            case "notifications":
                return <ManageNotifcation />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-gray-50">
                <AdminSidebar onPageChange={setActivePage} activePage={activePage} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <TopBar />
                    <div className="flex-1 overflow-auto p-6">{renderActivePage()}</div>
                </div>
            </div>
        </SidebarProvider>
    );
}
