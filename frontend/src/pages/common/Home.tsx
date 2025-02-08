import React from "react";
import Navbar from "@/components/ui/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import ProjectsSection from "@/components/common/ProjectsSection";
import FeaturesSection from "@/components/common/FeatureSection";
import TopFreelancers from "@/components/common/TopFreelancers";
import MaxWidth from "@/layouts/MaxWidth";

const Home: React.FC = () => {
    const { theme } = useSelector((state: RootState) => state.app);

    return (
        <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
            <div className="min-h-screen dark:bg-black">
                <MaxWidth>
                    <Navbar />
                    <main className="px-4 md:px-8 pb-16">
                        <Hero />
                        <FeaturesSection />
                        <ProjectsSection />
                        <TopFreelancers />
                    </main>
                </MaxWidth>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
