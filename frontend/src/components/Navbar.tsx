import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import * as Dialog from "@radix-ui/react-dialog";

interface NavItem {
    path: string;
    label: string;
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems: NavItem[] = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/services", label: "Services" },
        { path: "/contact", label: "Contact" },
    ];

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

                    {/* Sign-up and Sign-in buttons on the right */}
                    {/* <div className="hidden md:flex items-center space-x-2">
                        <Button variant="ghost">Sign In</Button>
                        <Button>Sign Up</Button>
                    </div> */}
                    <Link
                        to="/login"
                        className="px-3 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out"
                    >
                        Sign in
                    </Link>
                    <Link
                        to="/type"
                        className="px-6 py-2 rounded-full text-sm font-medium text-gray-700  bg-yellow-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out"
                    >
                        join
                    </Link>

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
                                            <Button variant="ghost">Sign In</Button>
                                            <Button>Sign Up</Button>
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
