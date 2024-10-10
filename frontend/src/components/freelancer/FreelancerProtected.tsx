import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../store/store";

const FreelancerProtected = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    console.log("privateRoute userInfo:", userInfo);

    return userInfo?.role == "freelancer" ? <Outlet /> : <Navigate to="/login" />;
};

export default FreelancerProtected;
