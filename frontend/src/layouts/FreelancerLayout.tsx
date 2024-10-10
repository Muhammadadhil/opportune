import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";


const FreelancerLayout = () => {
    return (
        <div>
            {/* <div className="w-full xl:w-[1280px] mx-auto relative min-h-dvh max-md:w-screen"></div> */}
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default FreelancerLayout;
