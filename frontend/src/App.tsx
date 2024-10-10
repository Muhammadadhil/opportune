import { Routes, Route } from "react-router-dom";
import Home from "./pages/common/Home";
import { ToastContainer } from "react-toastify";
import UserRoute from "./routes/UserRouter";
import AdminRoute from "./routes/AdminRouter";

function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/*" element={<UserRoute />} />
                <Route path="/admin*" element={<AdminRoute />} />
            </Routes>
        </>
    );
}

export default App;
