import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import Signup from "../pages/Signup";
import UserTypeSelection from "../pages/UserType";
import VerifyEmail from "../pages/VerfiyEmail";
import PrivateRoute from "./PrivateRoute";

function UserRoute() {
    return (
        <>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<Signup />} />
                <Route path="/type" element={<UserTypeSelection />} />

                {/* <Route path="" element={<PrivateRoute />}> */}
                    <Route path="/verify-email" element={<VerifyEmail />} />
                {/* </Route> */}
            </Routes>
        </>
    );
}

export default UserRoute;
