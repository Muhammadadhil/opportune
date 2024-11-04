import React, { useState } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import * as Dialog from "@radix-ui/react-dialog";
import { useSelector, useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/store/slices/userSlice";
import { clearPostFormData } from "@/store/slices/postSlice";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { RootState } from "@/store/store";
import { logout } from "@/api/userApi";
import { toggleTheme } from "@/store/slices/appSlice";

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
        { path: "/fr/dashboard", label: "Dashboard" },
        { path: "/find-jobs", label: "Post a project" },
        { path: "/hire-talents", label: "find jobs" },
    ];

    const clientMenu: NavItem[] = [
        { path: "/find-jobs", label: "Post a requirement" },
        { path: "/hire-talents", label: "find talents" },
    ];
    const { userInfo } = useSelector((state: RootState) => state.user);
    const { isLoading, theme } = useSelector((state: RootState) => state.app);

    const handleLogout = async () => {
        dispatch(logoutUser());
        dispatch(clearPostFormData());
        await logout();
    };

    const navigate = useNavigate();

    const navigateToProfile = () => {
        setIsOpen(false);
        navigate(userInfo?.role == "freelancer" ? "/fr/profile" : "/cl/profile");
    };

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <>
            {!isLoading && (
                <nav className={`${theme === "dark" ? " text-white" : " text-gray-800"} transition-colors duration-300`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo on the left */}
                            <div className="flex-shrink-0">
                                <a className="flex items-center">
                                    <Link to={'/'}>
                                        <h2 className={`font-Poppins text-2xl font-extrabold ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
                                            Opportune <span className="text-amber-500">.</span>
                                        </h2>
                                    </Link>
                                </a>
                            </div>

                            {/* Navigation links in the center */}
                            {userInfo?.role == "freelancer" ? (
                                <div className="hidden md:flex justify-center flex-1 ">
                                    {freelancerMenu.map((item) => (
                                        <Link
                                            to={item.path}
                                            key={item.path}
                                            className={`px-3 py-2 rounded-full text-sm font-medium ${
                                                theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
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
                                            className={`px-3 py-2 rounded-full text-sm font-medium ${
                                                theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="hidden md:flex justify-center flex-1">
                                    {menuItems.map((item) => (
                                        <Link
                                            to={item.path}
                                            key={item.path}
                                            className={`px-3 py-2 rounded-full text-sm font-medium ${
                                                theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Theme toggle */}
                            <button
                                onClick={handleToggleTheme}
                                className={`p-2 rounded-full mr-5 hidden md:block ${
                                    theme === "dark" ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                } transition-colors duration-300`}
                            >
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            {!userInfo ? (
                                <div className="hidden md:block">
                                    <Link
                                        to="/login"
                                        className={`px-3 py-2 rounded-full text-sm font-medium ${
                                            theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        to="/type"
                                        className={`px-6 py-2 rounded-full text-sm font-medium ${
                                            theme === "dark" ? "bg-green-600 text-white hover:bg-green-500" : "bg-green-800 text-white hover:bg-green-700"
                                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out`}
                                    >
                                        Join
                                    </Link>
                                </div>
                            ) : (
                                // Normal user dropdown menu
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <CgProfile className={`text-2xl hidden md:block ${theme === "dark" ? "text-white" : "text-gray-800"}`} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className={`pt-5 pb-4 text-center ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
                                            <DropdownMenuLabel>{userInfo.firstname + " " + userInfo.lastname}</DropdownMenuLabel>
                                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{userInfo.role}</p>
                                            <DropdownMenuSeparator className="px-16" />
                                            <DropdownMenuItem onClick={navigateToProfile}>Profile</DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}

                            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <AlertDialogContent className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                                            This action cannot be undone. This will log you out of your account.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel
                                            onClick={() => {
                                                setIsDialogOpen(false);
                                            }}
                                            className={theme === "dark" ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}
                                        >
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction onClick={handleLogout} className={theme === "dark" ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-600 text-white hover:bg-red-700"}>
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
                                            <Menu className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`} />
                                        </Button>
                                    </Dialog.Trigger>
                                    <Dialog.Portal>
                                        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                                        <Dialog.Content
                                            className={`fixed right-0 top-0 h-full w-[300px] max-w-[100vw] p-6 shadow-lg focus:outline-none ${
                                                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                                            }`}
                                        >
                                            <nav className="flex flex-col gap-4">
                                                {userInfo?.role == "freelancer" ? (
                                                    <div className="flex flex-col gap-4">
                                                        {freelancerMenu.map((item) => (
                                                            <Link
                                                                key={item.path}
                                                                to={item.path}
                                                                className={`px-3 py-2 rounded-md text-sm font-medium text-center ${
                                                                    theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : userInfo?.role == "client" ? (
                                                    <div className="flex flex-col gap-4">
                                                        {freelancerMenu.map((item) => (
                                                            <Link
                                                                key={item.path}
                                                                to={item.path}
                                                                className={`px-3 py-2 rounded-md text-sm font-medium text-center ${
                                                                    theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-4">
                                                        {menuItems.map((item) => (
                                                            <Link
                                                                key={item.path}
                                                                to={item.path}
                                                                className={`px-3 py-2 rounded-md text-sm font-medium text-center ${
                                                                    theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}

                                                {!userInfo ? (
                                                    <div className="flex flex-col gap-2 mt-4">
                                                        <Link
                                                            to="/login"
                                                            className={`px-3 py-2 text-center rounded-full text-sm font-medium ${
                                                                theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                            } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                        >
                                                            Sign in
                                                        </Link>
                                                        <Link
                                                            to="/type"
                                                            className={`px-6 py-2 text-center text-white rounded-full text-sm font-medium ${
                                                                theme === "dark" ? "bg-green-600 hover:bg-green-500" : "bg-green-800 hover:bg-green-700"
                                                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out`}
                                                        >
                                                            Join
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <div className="cursor-pointer space-y-3">
                                                        <div
                                                            onClick={navigateToProfile}
                                                            className={`px-3 py-2 rounded-md text-sm font-medium text-center ${
                                                                theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                            } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                        >
                                                            Profile
                                                        </div>
                                                        <div
                                                            onClick={handleLogout}
                                                            className={`px-3 py-2 rounded-md text-sm font-medium text-center ${
                                                                theme === "dark" ? "text-gray-300 hover:bg-gray-900 hover:text-white" : "text-gray-700 hover:bg-gray-700 hover:text-gray-100"
                                                            } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                        >
                                                            Logout
                                                        </div>
                                                    </div>
                                                )}
                                            </nav>
                                        </Dialog.Content>
                                    </Dialog.Portal>
                                </Dialog.Root>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default Navbar;
