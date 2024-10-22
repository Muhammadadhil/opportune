"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import profilePicture from "@/assets/profilePicture.jpg";
import { getProfileData } from "@/api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { setFreelancerData } from "@/store/slices/userSlice";

const Sidebar = () => {
    const { userInfo, freelancerData } = useSelector((state: any) => state.user);

    const dispatch = useDispatch();

    async function getData() {
        const response = await getProfileData(userInfo._id);
        dispatch(setFreelancerData(response.data));
    }

    useEffect(() => {
        if (Object.keys(freelancerData).length == 0) {
            getData();
        }
    }, []);

    const navigate = useNavigate();

    return (
        <div className="w-full border shadow-sm p-4 md:p-6 rounded-md mb-4 md:mb-0">
            <div className="mb-4 md:mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
                    <img src={freelancerData.imageUrl ? freelancerData.imageUrl : profilePicture} alt="Profile" className="h-16 w-16 md:h-12 md:w-20 md:h-20 rounded-full" />
                    <div className="text-center md:text-left">
                        <h4 className="font-bold">{userInfo?.firstname + " " + userInfo?.lastname || "User Name"}</h4>
                        <p className="text-gray-500 text-sm">{freelancerData.title ?? freelancerData.title}</p>
                    </div>
                </div>
                <div className="mt-4">
                    {Object.keys(freelancerData).length == 0 ? (
                        <Button variant="outline" className="w-full" onClick={() => navigate("/fr/complete-profile")}>
                            Complete your profile
                        </Button>
                    ) : (
                        ""
                    )}

                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-6">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
