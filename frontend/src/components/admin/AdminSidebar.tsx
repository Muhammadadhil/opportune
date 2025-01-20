import React from "react";
import { Briefcase, CreditCard, Settings, Users, LogOut, ChevronRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { logoutAdmin } from "@/api/admin";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAdminAuthStatus } from "@/store/slices/userSlice";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../common/ConfirmDialog";

interface AdminSidebarProps {
    onPageChange: (page: string) => void;
    activePage: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onPageChange, activePage }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await logoutAdmin();
            console.log("response:", response);
            dispatch(setAdminAuthStatus());
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error while logging out");
        } finally {
            setOpen(false);
        }
    };

    const menuItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "users", icon: Users, label: "Users" },
        { id: "jobs", icon: LayoutDashboard, label: "Jobs" },
        { id: "payments", icon: CreditCard, label: "Payments" },
        { id: "categories", icon: Briefcase, label: "Categories" },
        { id: "notifications", icon: Settings, label: "Notifications" },
    ];

    const navigate = useNavigate();
    

    return (
        <div className="flex h-screen">
            <Sidebar className="border-r border-gray-200 dark:border-gray-800">
                <SidebarHeader className="p-4">
                    <h2 className="font-Poppins text-2xl font-extrabold text-slate-800 dark:text-white cursor-pointer">
                        Opportune <span className="text-amber-800 dark:text-amber-600">.</span>
                    </h2>
                </SidebarHeader>

                <SidebarContent className="bg-white dark:bg-black">
                    {menuItems.map((item) => (
                        <SidebarMenuItem
                            key={item.id}
                            className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 ${
                                activePage === item.id ? "bg-gray-100 dark:bg-black border dark:border-gray-800" : ""
                            }`}
                            onClick={() => onPageChange(item.id)}
                        >
                            <item.icon className="w-5 h-5 mr-2" />
                            <span>{item.label}</span>
                        </SidebarMenuItem>
                    ))}
                </SidebarContent>
                <div className="mt-auto p-4">
                    
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirm Logout?</DialogTitle>
                                <DialogDescription>Are you sure you want to logout?</DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="default" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <SidebarTrigger className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-180 rounded-full border bg-background p-1.5 text-foreground">
                    <ChevronRight className="h-4 w-4" />
                </SidebarTrigger>
            </Sidebar>
        </div>
    );
};

export default AdminSidebar;
