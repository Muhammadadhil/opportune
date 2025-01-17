import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import UserRoute from "./routes/UserRouter";
import AdminRoute from "./routes/AdminRouter";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { VideoCallProvider } from "@/contexts/videoCallContext";

function App() {

    const { theme } = useSelector((state: RootState) => state.app);

    useEffect(() => {
        document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
    }, [theme]);

    return (
        <VideoCallProvider>
            <ToastContainer />
            <Toaster  />
            <Routes>
                <Route path="/*" element={<UserRoute />} />
                <Route path="/admin/*" element={<AdminRoute />} />
            </Routes>
        </VideoCallProvider>
    );
}

export default App;
