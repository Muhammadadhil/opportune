import { Briefcase, CreditCard, Settings, Users } from "lucide-react";
import Button from "./Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { logoutAdmin } from "@/api/admin";
import toast from "react-hot-toast";

const AdminSidebar = () => {
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await logoutAdmin();
            console.log("logoutresponse:", response);
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
                <Button variant="ghost" className="w-full justify-start ">
                    <Users className="mr-2 h-4 w-4" />
                    <span className="hover:text-slate-500">Users</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span className="hover:text-slate-500">Services</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span className="hover:text-slate-500">payments</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="hover:text-slate-500">Notification</span>
                </Button>
            </nav>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="py-3 rounded-xl hover:bg-gray-100 hover:text-gray-800 transition  duration-300 ease-in-out">logout </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Logout?</DialogTitle>
                        <DialogDescription>Are you sure want to logout?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button className="bg-red-400 px-3 py-2 rounded-lg" onClick={handleLogout}>
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </aside>
    );
};

export default AdminSidebar;
