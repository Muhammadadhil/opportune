import React from "react";
import Navbar from "../../components/ui/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MouseTracker from "../../components/common/MouseTracker";
import { motion } from "framer-motion";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import Stats, { StatCard } from "@/components/common/Stats";
import MaxWidth from "@/layouts/MaxWidth";

const Home: React.FC = () => {
    const { theme } = useSelector((state: RootState) => state.app);

    return (
        <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
            <div className="min-h-screen dark:bg-black">
                <MaxWidth>
                    <Navbar />
                    <main className="px-8 pb-16">
                        <Hero />
                        <div className="mt-12">
                            <div className="grid grid-cols-12 gap-12 items-center">
                                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="col-span-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80"
                                        alt="Industrial Manufacturing"
                                        className="w-full h-96 object-cover rounded-2xl"
                                    />
                                </motion.div>
                                <div className="col-span-6">
                                    <Stats />
                                </div>
                                <motion.div initial={{ x: -40 }} animate={{ x: 0 }} transition={{ duration: 1.6 }} className="col-span-3">
                                    <StatCard number="99%" title="Client Satisfaction with Completed Projects" height={96} width={60} />
                                </motion.div>
                            </div>
                        </div>
                    </main>
                </MaxWidth>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
