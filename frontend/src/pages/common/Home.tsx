import React from "react";
import Navbar from "../../components/ui/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import Stats from "@/components/common/Stats";
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
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 items-center ">
                                {/* Left Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="col-span-12 sm:col-span-6 xl:col-span-3 flex justify-center"
                                >
                                    <div className="relative flex flex-col items-center w-full max-w-[21rem]">
                                        <div className="relative w-full h-72 sm:h-80 lg:h-96">
                                            <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
                                            <img src={"src/assets/freelaner-image.jpg"} alt="Freelancing image" className="w-full h-full object-cover rounded-2xl shadow-lg" />
                                        </div>
                                        <h2 className="absolute top-1/2 text-white text-lg sm:text-xl lg:text-2xl font-semibold text-center">Freelancing</h2>
                                    </div>
                                </motion.div>

                                {/* Stats Section */}
                                <div className="col-span-12 sm:col-span-6 lg:col-span-6 flex justify-center items-end">
                                    <Stats />
                                </div>

                                {/* Right Card */}
                                <motion.div initial={{ x: -40 }} animate={{ x: 0 }} transition={{ duration: 1.6 }} className="col-span-12 sm:col-span-6 xl:col-span-3 flex justify-center">
                                    <div className="bg-green-700 text-white h-72 sm:h-80 lg:h-96 w-full max-w-[21rem] flex flex-col items-center justify-center text-center rounded-3xl shadow-lg">
                                        <div className="text-2xl font-bold">99%</div>
                                        <div className="text-sm mt-2 opacity-90">Client Satisfaction with Completed Projects</div>
                                    </div>
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
