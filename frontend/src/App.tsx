import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import UserRoute from "./routes/UserRouter";
import AdminRoute from "./routes/AdminRouter";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
// import { Toaster } from "@/components/ui/toaster";

function App() {

    const { theme } = useSelector((state: RootState) => state.app);

    useEffect(() => {
        document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
    }, [theme]);

    return (
        <>
            <ToastContainer />
            <Toaster />
                <Routes>
                    <Route path="/*" element={<UserRoute />} />
                    <Route path="/admin/*" element={<AdminRoute />} />
                </Routes>
            
        </>
    );
}

export default App;
