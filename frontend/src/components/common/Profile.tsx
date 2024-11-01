import { Menu, Lightbulb, MapPin, Mail, Briefcase, Globe, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import profilePicture from "@/assets/profilePicture.jpg";
import { getClientProfileData, getProfileData } from "@/api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { setClientData } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function Profile() {
    const { userInfo, freelancerData, clientData } = useSelector((state: any) => state.user);
    const [profileImage, setProfileImage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function getData() {
        try {
            const response = await getProfileData(userInfo._id);
            // console.log("profile data res:", response);
            const imgUrl = response.data.imageUrl;
            setProfileImage(imgUrl);
        } catch (error) {
            console.log("error fetching profile data:", error);
        }
    }

    const getClientData = async () => {
        try {
            const response = await getClientProfileData(userInfo._id);
            dispatch(setClientData(response.data));
        } catch (error) {
            console.log("error fetching profile data:", error);
        }
    };

    useEffect(() => {
        if (userInfo.role == "freelancer") {
            getData();
        } else {
            getClientData();
        }
    }, []);

    return (
        <div className="md:w-8/12 mx-auto mt-10 flex">
            <div className="min-w-[20rem] bg-white rounded-lg shadow-md overflow-hidden ">
                <div className="p-4">
                    <div className="flex flex-col items-center mt-12">
                        <div className="relative">
                            <img src={freelancerData.imageUrl ? freelancerData.imageUrl : profilePicture} alt="hi" className="w-24 h-24 rounded-full " />
                        </div>
                        <h2 className="mt-4 text-xl font-semibold">{userInfo.firstname + userInfo.lastname}</h2>
                        <p className="text-sm text-slate-500 mb-3">{userInfo.role}</p>
                        <p className="text-gray-600 text-sm text-center">{freelancerData?.title}</p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        {!freelancerData ? (
                            <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors text-sm" onClick={() => navigate("/fr/complete-profile")}>
                                Complete your profile
                            </button>
                        ) : (
                            <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors">Edit profile</button>
                        )}
                    </div>

                    <div className="mt-6 space-y-2 text-sm text-gray-600">
                        <p className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <MapPin />
                            </svg>
                            {userInfo.country}
                        </p>
                        <p className="flex items-center ">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <Mail />
                            </svg>
                            {userInfo.email}
                        </p>

                        {userInfo.role == "freelancer" ? (
                            <div className="flex items-center">
                                {freelancerData ? (
                                    <div>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <Lightbulb />
                                        </svg>
                                        <div className="flex  items-center mb-2 ">
                                            {freelancerData?.skills?.map((skill,index) => (
                                                <span key={index}>
                                                    {skill}
                                                    {index < clientData?.projectNeeds?.length - 1 && <span className="font-bold mx-2">&bull;</span>}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            <p className="mt-16 cursor-pointer">
                                <div className="flex items-start mt-5">
                                    <Building2 className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-gray-900">{clientData.companyName}</h3>
                                        <p>{clientData.companyDescription}</p>
                                    </div>
                                </div>
                                <div className="flex items-start mt-4">
                                    <Briefcase className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-gray-900">Project Needs</h3>
                                        <p>
                                            {clientData?.projectNeeds?.map((need: string, index: number) => (
                                                <span key={index}>
                                                    {need}
                                                    {index < clientData?.projectNeeds?.length - 1 && <span className="font-bold mx-2">&bull;</span>}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <Globe className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                                    <h3 className="font-medium text-gray-900 cursor-pointer">{clientData.website}</h3>
                                </div>
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="md:w-full md:ml-5 h-auto rounded-md bg-gray-100 "></div>
        </div>
    );
}
