import { Button } from "@/components/ui/button1";
import { useNavigate } from "react-router-dom";
import profilePicture from "@/assets/profilpic.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFreelancerProfile } from "@/hooks/user/useFreelancerProfile";

const Sidebar = () => {

    const { userInfo } = useSelector((state: RootState) => state.user);

    const { data: freelancerData } = useFreelancerProfile(userInfo?.role, userInfo?._id);
    
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full border shadow-sm p-4 md:p-6 rounded-md mb-4 md:mb-5 ">
                <div className="mb-4 md:mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4 cursor-pointer" onClick={() => navigate("/fr/profile")}>
                        <img src={freelancerData?.imageUrl ? freelancerData?.imageUrl : profilePicture} alt="Profile" className="h-16 w-16 md:w-20 md:h-20 rounded-full" />
                        <div className="text-center md:text-left">
                            <h4 className="font-bold">{userInfo?.firstname + " " + userInfo?.lastname || "User Name"}</h4>
                            <h5 className="text-gray-500  text-sm">{userInfo?.role}</h5>

                            {/* <p className="text-gray-500 text-sm">{freelancerData?.title ?? freelancerData.title}</p> */}
                        </div>
                    </div>
                    <div className="mt-4  ">
                        {freelancerData && Object.keys(freelancerData).length !== 0 ? (
                            <p className="text-sm text-gray-700 ">{freelancerData?.title}</p>
                        ) : (
                            <div>
                                <Button variant="outline" className="w-full border-green-600" onClick={() => navigate("/fr/complete-profile")}>
                                    Complete your profile
                                </Button>
                                {/* <div className="w-full bg-gray-300 rounded-full h-2.5 mt-6">
                                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                                </div> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
