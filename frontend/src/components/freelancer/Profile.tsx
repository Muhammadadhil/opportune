
import { Heart, Menu, Lightbulb, MapPin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
// import { PencilIcon, MapPinIcon, ShareIcon, PlusIcon } from "lucide-react";
import profilePicture from "@/assets/profilePicture.jpg";
import { getProfileData } from "@/api/userApi";
import { useSelector, useDispatch } from "react-redux";
// import { setFreelancerData } from "@/store/slices/userSlice";


export default function Profile() {
    const { userInfo, freelancerData } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const [profileImage, setProfileImage] = useState("");

    async function getData() {
        const response = await getProfileData(userInfo._id);
        console.log("profile data res:", response);

        const imgUrl = response.data.imageUrl;
        setProfileImage(imgUrl);
        // dispatch(setFreelancerData(response.data));
    }

    useEffect(() => {
        // console.log("freelancerData from redux:", freelancerData);
        // if (Object.keys(freelancerData).length==0){
        // console.log('going to fetch data!!!')
        getData();
        // }
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
                        <p className="text-sm text-slate-500 mb-3">freelancer</p>
                        <p className="text-gray-600">{freelancerData.title}</p>

                    </div>
                    <div className="mt-6 flex justify-center">
                        <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 transition-colors">Edit profile</button>
                    </div>
                    <div className="mt-6 space-y-2 text-sm text-gray-600">
                        <p className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <MapPin />
                            </svg>
                            {userInfo.country}
                        </p>
                        <p className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <Mail />
                            </svg>
                            {userInfo.email}
                        </p>
                        <p className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <Lightbulb />
                            </svg>
                            <div className="flex  items-center mb-2 ">
                                {freelancerData?.skills?.map((skill) => (
                                    <div className="">
                                        <p> {skill} .</p>
                                    </div>
                                ))}
                            </div>
                        </p>
                    </div>
                </div>
            </div>
            <div className="md:w-full md:ml-5 h-auto rounded-md bg-gray-100 "></div>
        </div>
    );
}
