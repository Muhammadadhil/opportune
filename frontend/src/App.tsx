import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import UserRoute from "./routes/UserRouter";
import AdminRoute from "./routes/AdminRouter";

function App() {
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
