import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CompleteProfile = () => {
    const [newSkill, setNewSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const [showPortfolioInputs, setShowPortfolioInputs] = useState(false);

    const addSkill = () => {
        if (newSkill && skills.length < 10) {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    return (
        <div className="max-w-[350px] md:max-w-[1300px] mx-auto p-6 rounded-lg ">
            <div className="flex justify-center py-2 rounded-t-lg">
                <h2 className="text-xl font-bold">Complete your profile</h2>
            </div>

            <div className="space-y-6  mt-4">
                {/* Title / Description */}
                <div>
                    <h2 className="font-bold text-slate-800 mb-2">Title / Description</h2>
                    <Textarea placeholder="Describe your professional title and a brief description." className="w-full" maxLength={250} />
                    <p className="text-sm text-gray-500 mt-1">Maximum 50 words</p>
                </div>

                {/* Skills Section */}
                <div>
                    <h2 className="font-bold text-slate-800 mb-2">Skills</h2>
                    <div className="flex space-x-2 mb-2">
                        <Input type="text" placeholder="Add a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="flex-grow" />
                        <Button onClick={addSkill} disabled={skills.length >= 10}>
                            Add
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{10 - skills.length} skills left</p>
                </div>

                {/* Portfolio Section */}
                <div>
                    <h2 className="font-bold text-slate-800 mb-2">Portfolio</h2>
                    <Button onClick={() => setShowPortfolioInputs(!showPortfolioInputs)}>{showPortfolioInputs ? "Hide Portfolio Inputs" : "Add Portfolio Item"}</Button>
                    {showPortfolioInputs && (
                        <div className="mt-4 space-y-4">
                            <Input type="text" placeholder="Project Title" className="w-full" />
                            <Textarea placeholder="Project Description" className="w-full" />
                            <Input type="text" placeholder="Skills Used (comma-separated)" className="w-full" />
                            <Input type="file" className="w-full" />
                        </div>
                    )}
                </div>

                {/* Linked Accounts Section */}
                <div>
                    <h2 className="font-bold text-slate-800 mb-2">Linked Accounts</h2>
                    <Input type="text" placeholder="LinkedIn profile URL" className="w-full mb-2" />
                    <Input type="text" placeholder="GitHub profile URL" className="w-full mb-2" />
                    <Input type="text" placeholder="Other social media profile URL" className="w-full" />
                </div>
            </div>

            {/* Save Profile Button */}
            <div className="mt-4">
                <Button className="w-full">Save Profile</Button>
            </div>
        </div>
    );
};

export default CompleteProfile;
