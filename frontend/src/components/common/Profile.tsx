import { Lightbulb, MapPin, Mail, Briefcase, Globe, Building2, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import profilePicture from "@/assets/profilePicture.jpg";
import { getClientProfileData, getProfileData } from "@/api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { setClientData } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/store/store";
import GigCard from "../freelancer/GigCard";
import { fetchGigs } from "@/api/userApi";
import { IGig } from "@/types/IGig";
import JobCard from "../client/JobCard";

export default function Profile() {
    const { userInfo, freelancerData, clientData } = useSelector((state: RootState) => state.user);
    const { theme } = useSelector((state: RootState) => state.app);
    const [profileImage, setProfileImage] = useState("");
    const [gigs, setGigs] = useState<IGig[]>([]);
    const [jobs, setJobs] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function getData() {
        try {
            const response = await getProfileData(userInfo._id);
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

    const fetchProjects = async () => {
        const response = await fetchGigs(freelancerData.userId);
        console.log("gigs response:", response.data);
        setGigs(response.data);
    };

    // const fetchJobs = async () => {
    //     const response = await fetchGigs(freelancerData.userId);
    //     console.log("gigs response:", response.data);
    //     setGigs(response.data);
    // };

    useEffect(() => {
        console.log("calling to gigs!!");
        fetchProjects();
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className={`container mx-auto px-4 py-8 ${theme === "dark" ? " text-white" : " text-gray-900"}`}>
            <div className="flex flex-col lg:flex-row gap-8">
                <Card className={`lg:w-1/3 ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white"}`}>
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <img
                                    src={freelancerData.imageUrl ? freelancerData.imageUrl : profilePicture}
                                    alt="Profile"
                                    className={`w-32 h-32 rounded-full object-cover border-4 ${theme === "dark" ? "border-gray-700" : "border-white"}`}
                                />
                            </div>
                            <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>
                                {userInfo.firstname} {userInfo.lastname}
                            </h2>
                            <p className={`text-sm mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{userInfo.role}</p>
                            <p className={`text-sm text-center ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>{freelancerData?.title}</p>
                        </div>

                        <div className="mt-6 flex justify-center">
                            {!freelancerData ? (
                                <Button className="w-full" onClick={() => navigate("/fr/complete-profile")} variant={theme === "dark" ? "secondary" : "default"}>
                                    Complete your profile
                                </Button>
                            ) : (
                                <Button className="w-44" variant={theme === "dark" ? "secondary" : "outline"}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit profile
                                </Button>
                            )}
                        </div>

                        <div className="mt-6 space-y-3 text-sm">
                            <div className="flex items-center">
                                <MapPin className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                <span>{userInfo.country}</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{userInfo.email}</span>
                            </div>

                            {userInfo.role == "freelancer" && freelancerData?.skills && (
                                <div className="flex items-start">
                                    <Lightbulb className={`w-4 h-4 mr-2 mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    <div className="flex flex-wrap">
                                        {freelancerData.skills.map((skill, index) => (
                                            <span key={index} className={`rounded-full px-2 py-1 text-sm mr-2 mb-2 ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {userInfo.role == "client" && (
                                <>
                                    <div className="flex items-start">
                                        <Building2 className={`w-4 h-4 mr-2 mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                        <div>
                                            <h3 className="font-medium">{clientData.companyName}</h3>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{clientData.companyDescription}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Briefcase className={`w-4 h-4 mr-2 mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                        <div>
                                            <h3 className="font-medium">Project Needs</h3>
                                            <div className="flex flex-wrap mt-1">
                                                {clientData?.projectNeeds?.map((need: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className={`rounded-full px-2 py-1 text-xs mr-2 mb-2 ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                                                    >
                                                        {need}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Globe className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                        <a href={clientData.website} target="_blank" rel="noopener noreferrer" className={`hover:underline ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                                            {clientData.website}
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className={`lg:w-2/3 ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white"}`}>
                    <CardHeader>
                        <CardTitle className={theme === "dark" ? "text-gray-200" : "text-gray-600"}>Your Posts</CardTitle>
                    </CardHeader>
                    {userInfo.role == "freelancer" ? (
                        <CardContent className="flex gap-4 ">
                            {gigs.length < 1 && <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>No posts yet.</p>}

                            {gigs.map((item, index) => {
                                return (
                                    <GigCard
                                        key={index}
                                        title={item.title}
                                        description={item.description}
                                        deliveryTime={`${item.deliveryTime}days delivery`}
                                        price={item.price}
                                        category={item.category}
                                        subCategory={item.subCategory}
                                        theme={theme}
                                        images={item.images}
                                        imageUrls={item.imageUrls}
                                        isProfile={true}
                                        searchTags={item.searchTags}
                                        requirements={item.requirements}
                                    />
                                );
                            })}
                        </CardContent>
                    ) : (
                        <CardContent className="flex gap-4 ">
                            <JobCard />
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
    );
}
