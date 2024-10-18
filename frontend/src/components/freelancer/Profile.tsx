import { useEffect, useState } from "react";
import { PencilIcon, MapPinIcon, ShareIcon, PlusIcon } from "lucide-react";
import profilePicture from "@/assets/profilePicture.jpg";
import { getProfileData } from "@/api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { setFreelancerData } from "@/store/slices/userSlice";

interface ProfileData {
    name: string;
    location: string;
    hourlyRate: string;
    description: string;
    connects: number;
    hoursPerWeek: string;
    contractPreference: string;
    languages: { language: string; proficiency: string }[];
    skills: string[];
}

export default function Profile() {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "Dark B.",
        location: "Calicut, India",
        hourlyRate: "$20.00/hr",
        description: "I am a passionate web developer specializing in the MERN stack",
        connects: 0,
        hoursPerWeek: "More than 30 hrs/week",
        contractPreference: "No contract-to-hire preference set",
        languages: [{ language: "English", proficiency: "Basic" }],
        skills: ["html", "css", "js", "tailwindcss"],
    });

    const { userInfo, freelancerData } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const [profileImage, setProfileImage] = useState("");

    async function getData() {
        const response = await getProfileData(userInfo._id);
        console.log("profile data res:", response);

        const imgUrl = response.data.imageUrl;
        setProfileImage(imgUrl);
        dispatch(setFreelancerData(response.data));
    }

    useEffect(() => {
        if (Object.keys(freelancerData).length==0){
          getData();  
        } 
    }, []);

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div className="flex items-center mb-4 md:mb-0">
                            <img src={profileImage ? profileImage : profilePicture} alt="Profile" className="w-24 h-24 rounded-full mr-4 bg-gray-100" />
                            <div>
                                <h1 className="text-2xl font-bold">{userInfo.firstname + userInfo.lastname}</h1>
                                <p className="text-gray-600 flex items-center">
                                    <MapPinIcon className="w-4 h-4 mr-1" />
                                    {userInfo.country}
                                </p>
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-800">Edit Profile</button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">
                           
                            {/* <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold">Hours per week</h2>
                                    <PencilIcon className="w-4 h-4 text-green-800 cursor-pointer" />
                                </div>
                                <p>{profileData.hoursPerWeek}</p>
                                <p className="text-gray-500">{profileData.contractPreference}</p>
                            </div> */}

                            {/* <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold">Languages</h2>
                                    <div className="flex space-x-2">
                                        <PlusIcon className="w-5 h-5 text-green-800 cursor-pointer" />
                                        <PencilIcon className="w-4 h-4 text-green-800 cursor-pointer" />
                                    </div>
                                </div>
                                {profileData.languages.map((lang, index) => (
                                    <p key={index}>
                                        {lang.language}: {lang.proficiency}
                                    </p>
                                ))}
                            </div> */}
                        </div>

                        <div className="w-full md:w-2/3">
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl ">{freelancerData.title}</h2>
                                    <PencilIcon className="w-4 h-4 text-green-800 cursor-pointer" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-green-800">{profileData.hourlyRate}</span>
                                    <div className="flex space-x-2">
                                        <PencilIcon className="w-4 h-4 text-green-800 cursor-pointer" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2 ">
                                    <h2 className="text-xl font-semibold">Skills</h2>
                                    <PlusIcon className="w-5 h-5 text-green-800 cursor-pointer" />
                                </div>
                                <div className="flex  items-center mb-2 ">
                                    {freelancerData.skills.map((skill) => (
                                        <div className="py-2 px-6 m-2  text-center bg-gray-100 rounded-md">{skill}</div>
                                    ))}
                                </div>

                                {/* <div className="flex justify-between items-center mb-2 ">
                                    <h2 className="text-xl font-semibold">Portfolio</h2>
                                    <PlusIcon className="w-5 h-5 text-green-800 cursor-pointer" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="border rounded-md overflow-hidden ">
                                        <img src="/placeholder.svg?height=150&width=250" alt="Portfolio item" className="w-full h-32 object-cover text-center" />
                                        <p className="p-2 text-sm text-center">ecommerce platform</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
