
import AdminSidebar from "@/components/ui/AdminSidebar";
import Dashboard from "@/components/admin/Dashboard";
import TopBar from "@/components/ui/AdminDashboardTopBar"; 

export default function AdminDashboardPage() {
    return (
        <div className="flex h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar />
                <div className="flex-1 overflow-auto">
                    <Dashboard />
                </div>
            </div>
        </div>
    );
}
