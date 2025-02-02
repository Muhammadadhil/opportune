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
import { RootState } from "@/store/store";
import { logout } from "@/api/auth";
import { toggleTheme } from "@/store/slices/appSlice";
import Notification from "@/components/common/Notification";

interface NavItem {
    path: string;
    label: string;
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const menuItems: NavItem[] = [
        { path: "/find-jobs", label: "Find Jobs" },
        { path: "/hire-talents", label: "Find Talents" },
    ];

    const freelancerMenu: NavItem[] = [
        { path: "/fr/dashboard", label: "Dashboard" },
        { path: "/fr/manage-gigs", label: "Manage Work" },
        { path: "/explore", label: "Explore" },
    ];

    const clientMenu: NavItem[] = [
        { path: "/cl/dashboard", label: "Dashboard" },
        { path: "/cl/manage-jobs", label: "Your Jobs" },
        { path: "/talents", label: "Find Talents" },
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

    const navigateToChat = () => {
        setIsOpen(false);
        navigate('/chat');
    };

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <>
            {!isLoading && (
                <nav className={`${theme === "dark" ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo on the left */}
                            <div className="flex-shrink-0">
                                <Link to="/" className="flex items-center">
                                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                                        Opportune<span className="text-green-600">.</span>
                                    </h2>
                                </Link>
                            </div>

                            {/* Navigation links in the center - hidden on mobile */}
                            <div className="hidden md:flex justify-center flex-1">
                                {userInfo?.role === "freelancer"
                                    ? freelancerMenu.map((item) => (
                                          <Link
                                              to={item.path}
                                              key={item.path}
                                              className={`px-3 py-2 rounded-full text-sm font-medium ${
                                                  theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                              } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                          >
                                              {item.label}
                                          </Link>
                                      ))
                                    : userInfo?.role === "client"
                                    ? clientMenu.map((item) => (
                                          <Link
                                              to={item.path}
                                              key={item.path}
                                              className={`px-3 py-2 rounded-full text-sm font-medium ${
                                                  theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                              } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                          >
                                              {item.label}
                                          </Link>
                                      ))
                                    : menuItems.map((item) => (
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

                            {/* Theme toggle and notification - hidden on mobile */}
                            <div className="hidden md:flex items-center space-x-4">
                                <button
                                    onClick={handleToggleTheme}
                                    className={`p-2 rounded-full ${
                                        theme === "dark" ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    } transition-colors duration-300`}
                                >
                                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            </div>
                            <div className="mx-5">
                                <Notification />
                            </div>

                            {/* User menu - hidden on mobile */}
                            <div className="hidden md:block">
                                {!userInfo ? (
                                    <div className="flex items-center space-x-4">
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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <CgProfile className="text-2xl text-gray-800 dark:text-white" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="pt-5 pb-4 text-center">
                                            <DropdownMenuLabel>{userInfo.firstname + " " + userInfo.lastname}</DropdownMenuLabel>
                                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{userInfo.role}</p>
                                            <DropdownMenuSeparator className="px-16" />
                                            <DropdownMenuItem onClick={navigateToProfile}>Profile</DropdownMenuItem>
                                            <DropdownMenuItem onClick={navigateToChat}>Messages</DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>

                            {/* Mobile menu button */}
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
                                            className={`fixed inset-y-0 right-0 h-full w-64 p-6 shadow-lg focus:outline-none ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
                                        >
                                            <div className="flex flex-col h-full">
                                                <div className="flex justify-between items-center mb-6">
                                                    <h2 className="text-xl font-bold">Menu</h2>
                                                    <Dialog.Close asChild>
                                                        <button className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                                            </svg>
                                                        </button>
                                                    </Dialog.Close>
                                                </div>
                                                <nav className="flex-grow">
                                                    <div className="flex flex-col space-y-4">
                                                        {userInfo?.role === "freelancer"
                                                            ? freelancerMenu.map((item) => (
                                                                  <Link
                                                                      key={item.path}
                                                                      to={item.path}
                                                                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                                          theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                      } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                                      onClick={() => setIsOpen(false)}
                                                                  >
                                                                      {item.label}
                                                                  </Link>
                                                              ))
                                                            : userInfo?.role === "client"
                                                            ? clientMenu.map((item) => (
                                                                  <Link
                                                                      key={item.path}
                                                                      to={item.path}
                                                                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                                          theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                      } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                                      onClick={() => setIsOpen(false)}
                                                                  >
                                                                      {item.label}
                                                                  </Link>
                                                              ))
                                                            : menuItems.map((item) => (
                                                                  <Link
                                                                      key={item.path}
                                                                      to={item.path}
                                                                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                                          theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                      } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                                      onClick={() => setIsOpen(false)}
                                                                  >
                                                                      {item.label}
                                                                  </Link>
                                                              ))}
                                                    </div>
                                                </nav>
                                                <div className="mt-auto">
                                                    {!userInfo ? (
                                                        <div className="flex flex-col space-y-2">
                                                            <Link
                                                                to="/login"
                                                                className={`px-3 py-2 text-center rounded-md text-sm font-medium ${
                                                                    theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                Sign in
                                                            </Link>
                                                            <Link
                                                                to="/type"
                                                                className={`px-6 py-2 text-center text-white rounded-md text-sm font-medium ${
                                                                    theme === "dark" ? "bg-green-600 hover:bg-green-500" : "bg-green-800 hover:bg-green-700"
                                                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out`}
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                Join
                                                            </Link>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-3">
                                                            <button
                                                                onClick={() => {
                                                                    navigateToProfile();
                                                                    setIsOpen(false);
                                                                }}
                                                                className={`w-full px-3 py-2 rounded-md text-sm font-medium text-center ${
                                                                    theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                            >
                                                                Profile
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    handleLogout();
                                                                    setIsOpen(false);
                                                                }}
                                                                className={`w-full px-3 py-2 rounded-md text-sm font-medium text-center ${
                                                                    theme === "dark" ? "text-gray-300 hover:bg-gray-900 hover:text-white" : "text-gray-700 hover:bg-gray-700 hover:text-gray-100"
                                                                } focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out`}
                                                            >
                                                                Logout
                                                            </button>
                                                        </div>
                                                    )}
                                                    <div className="mt-4 flex justify-center">
                                                        <button
                                                            onClick={() => {
                                                                handleToggleTheme();
                                                                setIsOpen(false);
                                                            }}
                                                            className={`p-2 rounded-full ${
                                                                theme === "dark" ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                                            } transition-colors duration-300`}
                                                        >
                                                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
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
