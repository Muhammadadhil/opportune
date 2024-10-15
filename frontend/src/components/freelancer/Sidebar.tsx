import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import profilePicture from "@/assets/profilePicture.png";
import { useNavigate } from "react-router-dom";

interface ProfileItem {
    title: string;
    description: string;
}

const profileItems: ProfileItem[] = [
    { title: "Employment history", description: "Past job experiences and positions" },
    { title: "Portfolio", description: "Work samples, case studies, etc." },
    { title: "Linked accounts", description: "Connect a social media profile" },
    { title: "Skills", description: "update your skills" },
];

const Sidebar = () => {
    const { userInfo } = useSelector((state: any) => state.user);
    console.log("u:", userInfo);

    const navigate = useNavigate();

    const handleNavigate = () => {
        
        navigate("/fr/profile", { state: { showModal: true } });
    };

    return (
        <div className="w-full  border shadow-sm p-4 md:p-6 rounded-md mb-4 md:mb-0">
            <div className="mb-4 md:mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
                    <img src={profilePicture} alt="Profile" className="h-16 w-16 md:h-12 md:w-12 rounded-full" />
                    <div className="text-center md:text-left">
                        <h4 className="font-bold">{userInfo?.firstname + userInfo?.lastname || "User Name"}</h4>
                        <p className="text-gray-500 text-sm">I will develop websites for your businesses</p>
                    </div>
                </div>
                <div className="mt-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                                Complete your profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Complete your profile</DialogTitle>
                                <DialogDescription>Choose the item you want to update now.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                {profileItems.map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div onClick={handleNavigate} className="w-full p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                                            <p className="font-semibold">{item.title}</p>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-6">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
