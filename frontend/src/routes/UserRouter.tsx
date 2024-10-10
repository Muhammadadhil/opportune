import { Routes, Route } from "react-router-dom";
import Home from "../pages/common/Home";
import LoginPage from "../pages/common/Login";
import Signup from "../pages/common/Signup";
import Profile from "../pages/ProfilePage";
import UserTypeSelection from "../pages/common/UserRolePage";
import VerifyEmail from "../pages/common/VerfiyEmail";
import PrivateRoute from "./PrivateRoute";
import ClientPrivateRoute from "./ClientPrivateRoute";
import DetailsClient from "../pages/client/ClientDetailsPage";
import ClientDashboard from "../pages/client/ClientDashboardPage";
import FreelancerLayout from "@/layouts/FreelancerLayout";
import FreelancerDashboard from "@/pages/freelancer/Dashboard";
import FreelancerProtected from "@/components/freelancer/FreelancerProtected";

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
                    <Route path="cl/dashboard" element={<ClientDashboard />}/>
                    <Route path="cl/details" element={<DetailsClient />} />
                </Route>

                <Route element={<FreelancerProtected />}>
                    <Route element={<FreelancerLayout />}>
                        <Route path="fr/dashboard" element={<FreelancerDashboard />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default UserRoute;
