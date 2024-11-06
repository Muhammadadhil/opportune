import { Briefcase, CreditCard, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { logoutAdmin } from "@/api/admin";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAdminAuthStatus } from "@/store/slices/userSlice";
import { ReactSetState } from "@/types/ReactSetState";

interface AdminSidebarProps {
    onPageChange: ReactSetState<string>;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onPageChange }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logoutAdmin();
            dispatch(setAdminAuthStatus());
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error while logging out");
        } finally {
            setOpen(false);
        }
    };

    return (
        <aside className="w-64 bg-gray-800 text-white p-4 hidden md:flex flex-col justify-between min-h-screen">
            <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => onPageChange("dashboard")}>
                    <Users className="mr-2 h-4 w-4" />
                    <span className="hover:text-slate-500">Dashboard</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => onPageChange("users")}>
                    <Users className="mr-2 h-4 w-4" />
                    <span className="hover:text-slate-500">Users</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => onPageChange("payments")}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span className="hover:text-slate-500">Payments</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => onPageChange("categories")}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span className="hover:text-slate-500">Categories</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => onPageChange("notifications")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="hover:text-slate-500">Notifications</span>
                </Button>
            </nav>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="py-3 rounded-xl hover:bg-gray-100 hover:text-gray-800 transition duration-300 ease-in-out">Logout</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Logout?</DialogTitle>
                        <DialogDescription>Are you sure you want to logout?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleLogout}>
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </aside>
    );
};

export default AdminSidebar;
