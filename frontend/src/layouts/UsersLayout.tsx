import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "@/components/common/Footer";

const UsersLayout = () => {

    return (
        <div >
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
};

export default UsersLayout;
