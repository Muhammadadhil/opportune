"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

interface ProfileItem {
    title: string;
    description: string;
}

const profileItems: ProfileItem[] = [
    { title: "Title", description: "update your position" },
    { title: "Skills", description: "update your skills" },
    { title: "Portfolio", description: "Work samples, case studies, etc." },
    { title: "Experience", description: "Past job experiences and positions" },
    { title: "Linked Accounts", description: "Connect a social media profile" },
];

const Sidebar = () => {
    const { userInfo } = useSelector((state: any) => state.user);
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState("");
    const [showPortfolioInputs, setShowPortfolioInputs] = useState(false);

    const navigate = useNavigate();

    const addSkill = () => {
        if (newSkill.trim() !== "" && skills.length < 10) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    return (
        <div className="w-full border shadow-sm p-4 md:p-6 rounded-md mb-4 md:mb-0">
            <div className="mb-4 md:mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
                    <img src="/placeholder.svg?height=48&width=48" alt="Profile" className="h-16 w-16 md:h-12 md:w-12 rounded-full" />
                    <div className="text-center md:text-left">
                        <h4 className="font-bold">{userInfo?.firstname + " " + userInfo?.lastname || "User Name"}</h4>
                        <p className="text-gray-500 text-sm">I will develop websites for your businesses</p>
                    </div>
                </div>
                <div className="mt-4">
                    <Button variant="outline" className="w-full" onClick={() => navigate("/fr/complete-profile")}>
                        Complete your profile
                    </Button>

                    
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-6">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
