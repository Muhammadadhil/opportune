import React from "react";
import Navbar from "@/components/ui/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";

import MaxWidth from "@/layouts/MaxWidth";
import CategoryGrid from "@/components/common/CategoryGrid";
import FeatureSection from "./Features";

const Home: React.FC = () => {
    const { theme } = useSelector((state: RootState) => state.app);

    return (
        <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
            <div className="min-h-screen dark:bg-black">
                <MaxWidth>
                    <Navbar />
                    <main className="px-4 md:px-8 pb-16">
                        <Hero />
                        <CategoryGrid/>
                    </main>
                    <FeatureSection/>
                    
                </MaxWidth>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
