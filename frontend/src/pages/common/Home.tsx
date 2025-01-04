import React from "react";
import Navbar from "../../components/ui/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MouseTracker from "../../components/common/MouseTracker";
import { motion } from "framer-motion";

const Home: React.FC = () => {
    const { theme } = useSelector((state: RootState) => state.app);

    return (
        <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
            <div className="min-h-screen  dark:bg-black ">
                <MouseTracker
                    cursorElement={<div className="w-5 h-5 rounded-full bg-green-500 opacity-50" />}
                >
                    <div>
                        <Navbar />

                        <main className="container mx-auto px-4 py-48">
                            <div className="flex flex-col items-center justify-center space-y-8 text-center">
                                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-white">
                                        Unlock Your Potential with
                                        <span className="block text-green-800 ">Freelance Opportunities</span>
                                    </h1>
                                    <p className="max-w-2xl mx-auto text-xl my-8 text-gray-600 dark:text-gray-300 sm:text-2xl">
                                        Connect with clients and showcase your skills. Start your freelancing journey today!
                                    </p>
                                    <div className="w-full max-w-md mt-4 mx-auto">
                                        <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                                            <Input
                                                className="flex-grow bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder="Search for opportunities..."
                                                type="search"
                                                aria-label="Search for opportunities"
                                            />
                                            <Button type="submit" aria-label="Search" variant="default">
                                                <Search className="h-4 w-4" />
                                                <span className="sr-only">Search</span>
                                            </Button>
                                        </form>
                                    </div>
                                </motion.div>
                            </div>
                        </main>
                    </div>
                </MouseTracker>
            </div>
        </div>
    );
};

export default Home;
