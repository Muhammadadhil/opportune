import { useState } from "react";
import { PencilIcon, MapPinIcon, ShareIcon, PlusIcon } from "lucide-react";

interface ProfileData {
    name: string;
    location: string;
    hourlyRate: string;
    description: string;
    connects: number;
    hoursPerWeek: string;
    contractPreference: string;
    languages: { language: string; proficiency: string }[];
}

export default function Profile() {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "Dark B.",
        location: "Calicut, India",
        hourlyRate: "$20.00/hr",
        description:
            "I am a passionate web developer specializing in the MERN stack",
        connects: 0,
        hoursPerWeek: "More than 30 hrs/week",
        contractPreference: "No contract-to-hire preference set",
        languages: [{ language: "English", proficiency: "Basic" }],
    });

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div className="flex items-center mb-4 md:mb-0">
                            <img src="https://www.vecteezy.com/free-vector/profile-pic" alt="Profile" className="w-24 h-24 rounded-full mr-4 bg-gray-100" />
                            <div>
                                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                                <p className="text-gray-600 flex items-center">
                                    <MapPinIcon className="w-4 h-4 mr-1" />
                                    {profileData.location}
                                </p>
                            </div>
                        </div>
                        <div className="space-x-2">
                            <button className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-800">Profile settings</button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">
                            {/* <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">Promote with ads</h2>
                                <div className="flex justify-between items-center mb-2">
                                    <span>Availability badge</span>
                                    <PencilIcon className="w-4 h-4 text-green-800 cursor-pointer" />
                                </div>
                                <p className="text-gray-500">Off</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span>Boost your profile</span>
                                    <PencilIcon className="w-4 h-4 text-green-800 cursor-pointer" />
                                </div>
                                <p className="text-gray-500">Off</p>
                            </div> */}

                            {/* <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">Connects: {profileData.connects}</h2>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 border border-green-800 text-green-800 rounded-md text-sm hover:bg-green-80">View details</button>
                                    <button className="px-3 py-1 border border-green-800 text-green-800 rounded-md text-sm hover:bg-green-80">Buy Connects</button>
                                </div>
                            </div> */}

                            {/* <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold">Video introduction</h2>
                                    <PlusIcon className="w-5 h-5 text-green-800 cursor-pointer" />
                                </div>
                            </div> */}

                            {/* <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold">Hours per week</h2>
                                    <PencilIcon className="w-4 h-4 text-green-800 cursor-pointer" />
                                </div>
                                <p>{profileData.hoursPerWeek}</p>
                                <p className="text-gray-500">{profileData.contractPreference}</p>
                            </div> */}

                            <div>
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
                            </div>
                        </div>

                        <div className="w-full md:w-2/3">
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-bold">i will develop fast and reliable web app using MERN stack</h2>
                                    <PencilIcon className="w-4 h-4 text-green-800 cursor-pointer" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-green-800">{profileData.hourlyRate}</span>
                                    <div className="flex space-x-2">
                                        <PencilIcon className="w-4 h-4 text-green-800 cursor-pointer" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <PencilIcon className="w-4 h-4 text-green-800 cursor-pointer" />
                                </div>
                                <p className="text-gray-700">{profileData.description}</p>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2 ">
                                    <h2 className="text-xl font-semibold">Portfolio</h2>
                                    <PlusIcon className="w-5 h-5 text-green-800 cursor-pointer" />
                                </div>
                                <div className="flex space-x-4 mb-2">
                                    <button className="px-3 py-1 bg-green-800 text-white rounded-md text-sm">Published</button>
                                    <button className="px-3 py-1 text-gray-500 rounded-md text-sm">Drafts</button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="border rounded-md overflow-hidden">
                                        <img src="/placeholder.svg?height=150&width=250" alt="Portfolio item" className="w-full h-32 object-cover" />
                                        <p className="p-2 text-sm">portfolio website</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

