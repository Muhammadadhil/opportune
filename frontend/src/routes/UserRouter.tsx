import { Routes, Route } from "react-router-dom";
import Home from "../pages/common/Home";
import LoginPage from "../pages/common/Login";
import Signup from "../pages/common/Signup";
import UserTypeSelection from "../pages/common/UserRolePage";
import VerifyEmail from "../pages/common/VerfiyEmail";
import ClientProtected from '@/components/client/ClientProtected';
import DetailsClient from "../pages/client/ClientDetailsPage";
import ClientDashboard from "../pages/client/ClientDashboardPage";
import UsersLayout from "@/layouts/UsersLayout";
import FreelancerDashboard from "@/pages/freelancer/DashboardPage";
import FreelancerProtected from "@/components/freelancer/FreelancerProtected";
import ProfilePage from "@/pages/freelancer/ProfilePage";
import CompleteProfile from "@/components/freelancer/CompleteProfile"
import PostProject from "@/pages/freelancer/PostProjectPage";
import PostJobPage from "@/pages/client/PostJobPage";
import ClientJobsPage from "@/pages/client/ClientJobsPage";
import MangeWorkPage from "@/pages/freelancer/ManageWorkPage";
import JobDetailsPage from '@/pages/client/JobDetailsPage';
import SendOfferPage from '@/pages/client/ClientSendOfferPage';
import SuccessPage from '@/components/common/SuccessPage';
import PaymentSuccess from "../components/common/PaymentSuccess";
import ExplorePage from "../pages/freelancer/ExplorePage";
import ChatPage from '../pages/common/ChatPage';
import UserProtected from "@/components/common/UserProtected";
import VideoCallWrapper from "@/pages/common/VideoCallWrapper";

function UserRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/join" element={<Signup />} />
                <Route path="/type" element={<UserTypeSelection />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/offer-success" element={<SuccessPage />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route element={<UsersLayout />}>
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="" element={<UserProtected />}>
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/video-chat" element={<VideoCallWrapper />} />
                    </Route>
                </Route>

                <Route path="" element={<ClientProtected />}>
                    <Route element={<UsersLayout />}>
                        <Route path="cl/dashboard" element={<ClientDashboard />} />
                        <Route path="cl/profile" element={<ProfilePage />} />
                        <Route path="cl/postjob" element={<PostJobPage />} />
                        <Route path="cl/manage-jobs" element={<ClientJobsPage />} />
                        <Route path="cl/jobdetail/:id" element={<JobDetailsPage />} />
                        <Route path="cl/send-offer/:jobId" element={<SendOfferPage />} />
                    </Route>
                    <Route path="cl/details" element={<DetailsClient />} />
                </Route>
                <Route element={<FreelancerProtected />}>
                    <Route element={<UsersLayout />}>
                        <Route path="fr/dashboard" element={<FreelancerDashboard />} />
                        <Route path="fr/profile" element={<ProfilePage />} />
                        <Route path="fr/complete-profile" element={<CompleteProfile />} />
                        <Route path="/fr/post-project" element={<PostProject />} />
                        <Route path="/fr/manage-gigs" element={<MangeWorkPage />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default UserRoute;
