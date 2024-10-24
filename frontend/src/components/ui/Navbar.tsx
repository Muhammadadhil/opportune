import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import * as Dialog from "@radix-ui/react-dialog";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { RootState } from "@/store/store";

interface NavItem {
    path: string;
    label: string;
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const menuItems: NavItem[] = [
        { path: "/find-jobs", label: "Find Jobs" },
        { path: "/hire-talents", label: "Hire Talents" },
        { path: "/contact", label: "Discover" },
    ];

    const freelancerMenu: NavItem[] = [
        { path: "/find-jobs", label: "Post a project" },
        { path: "/hire-talents", label: "find jobs" },
    ];

    const clientMenu: NavItem[] = [
        { path: "/find-jobs", label: "Post a requirement" },
        { path: "/hire-talents", label: "find talents" },
    ];
    const { userInfo, isAdminAuthenticated } = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    const navigate = useNavigate();

    const nvaigateToProfile = () => {
        navigate(userInfo?.role == "freelancer" ? "/fr/profile" : "/cl/profile");
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo on the left */}
                    <div className="flex-shrink-0">
                        <a className="flex items-center">
                            <h2 className="font-Poppins text-2xl font-extrabold text-slate-800">
                                Opportune <span className="text-amber-800">.</span>
                            </h2>
                        </a>
                    </div>

                    {/* Navigation links in the center */}
                    {userInfo?.role == "freelancer" ? (
                        <div className="hidden md:flex justify-center flex-1">
                            {freelancerMenu.map((item) => (
                                <Link
                                    to={item.path}
                                    key={item.path}
                                    className="px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    ) : userInfo?.role === "client" ? (
                        <div className="hidden md:flex justify-center flex-1">
                            {clientMenu.map((item) => (
                                <Link
                                    to={item.path}
                                    key={item.path}
                                    className="px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    ) : userInfo?.role === "admin" ? (
                        <div className="hidden md:flex justify-center flex-1"></div>
                    ) : (
                        <div className="hidden md:flex justify-center flex-1">
                            {menuItems.map((item) => (
                                <Link
                                    to={item.path}
                                    key={item.path}
                                    className="px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Sign-up and Sign-in buttons on the right */}
                    {/* <div className="hidden md:flex items-center space-x-2">
                        <Button variant="ghost">Sign In</Button>
                        <Button>Sign Up</Button>
                    </div> */}
                    {!userInfo ? (
                        <div className="hidden md:block">
                            <Link
                                to="/login"
                                className="px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/type"
                                className="px-6 py-2 rounded-full text-sm font-medium text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out"
                            >
                                Join
                            </Link>
                        </div>
                    ) : isAdminAuthenticated ? (
                        // Admin-specific dropdown menu
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <CgProfile className="text-2xl" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="pt-5 pb-4 text-center">
                                    <DropdownMenuLabel>admin</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="px-16 " />
                                    {/* <DropdownMenuItem onClick={navigateToAdminDashboard}>Admin Dashboard</DropdownMenuItem> */}
                                    {/* <DropdownMenuItem onClick={handleAdminLogout}>Logout</DropdownMenuItem> */}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        // Normal user dropdown menu
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <CgProfile className="text-2xl" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="pt-5 pb-4 text-center">
                                    <DropdownMenuLabel>{userInfo.firstname + " " + userInfo.lastname}</DropdownMenuLabel>
                                    <p className="text-xs text-slate-800">{userInfo.role}</p>
                                    <DropdownMenuSeparator className="px-16 " />
                                    <DropdownMenuItem onClick={navigateToProfile}>Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot be undone. This will log you out of your account.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel
                                    onClick={() => {
                                        setIsDialogOpen(false); // Close the dialog if "Cancel" is clicked
                                    }}
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleLogout} // Trigger the logout when "Continue" is clicked
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    {/* Mobile menu */}
                    <div className="flex items-center md:hidden">
                        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                            <Dialog.Trigger asChild>
                                <Button variant="ghost" aria-label="Open Menu">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                                <Dialog.Content className="fixed right-0 top-0 h-full w-[300px] max-w-[100vw] bg-white p-6 shadow-lg focus:outline-none">
                                    <nav className="flex flex-col gap-4">
                                        {menuItems.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                        <div className="flex flex-col gap-2 mt-4">
                                            <Link
                                                to="/login"
                                                className="px-3 py-2 text-center  rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out"
                                            >
                                                Sign in
                                            </Link>
                                            <Link
                                                to="/type"
                                                className="px-6 py-2 text-center text-white  bg-green-800 hover:bg-gray-100  rounded-full text-sm font-medium hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out"
                                            >
                                                join
                                            </Link>
                                        </div>
                                    </nav>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
