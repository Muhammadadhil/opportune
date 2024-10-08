import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/ProfilePage";
import UserTypeSelection from "../pages/UserRolePage";
import VerifyEmail from "../pages/VerfiyEmail";
import PrivateRoute from "./PrivateRoute";
import ClientPrivateRoute from "./ClientPrivateRoute";
import DetailsClient from "../pages/ClientDetailsPage"


function UserRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<Signup />} />
                <Route path="/type" element={<UserTypeSelection />} />

                <Route path="" element={<PrivateRoute />}>
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="" element={<ClientPrivateRoute />}>
                    <Route path="/cl/details" element={<DetailsClient />} />
                </Route>

                
                <Route path="cl/details" element={<DetailsClient />}/>
            </Routes>
        </>
    );
}

export default UserRoute;
