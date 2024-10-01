
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import Signup from "../pages/Signup";
import UserTypeSelection from "../pages/UserType";


function UserRoute() {
    return (
        <>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<Signup />} />
                <Route path="/type" element={<UserTypeSelection />} />
            </Routes>
        </>
    );
}

export default UserRoute;