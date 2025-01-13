import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Footer from "@/components/common/Footer";


const UsersLayout = () => {
    // const { theme } = useSelector((state: RootState) => state.app);

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
