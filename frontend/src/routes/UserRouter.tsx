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
import UsersLayout from "@/layouts/UsersLayout";
import FreelancerDashboard from "@/pages/freelancer/DashboardPage";
import FreelancerProtected from "@/components/freelancer/FreelancerProtected";
import ProfilePage from "@/pages/freelancer/ProfilePage";
import CompleteProfile from "@/components/freelancer/CompleteProfile"

function UserRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<Signup />} />
                <Route path="/type" element={<UserTypeSelection />} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                <Route path="" element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="" element={<ClientPrivateRoute />}>
                    <Route element={<UsersLayout />}>
                        <Route path="cl/dashboard" element={<ClientDashboard />} />
                    </Route>
                    <Route path="cl/details" element={<DetailsClient />} />
                </Route>

                <Route element={<FreelancerProtected />}>
                    <Route element={<UsersLayout />}>
                        <Route path="fr/dashboard" element={<FreelancerDashboard />} />
                        <Route path="fr/profile" element={<ProfilePage />} />
                        <Route path="fr/complete-profile" element={<CompleteProfile />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default UserRoute;
