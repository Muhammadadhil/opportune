import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../ui/MultiSelect";

const DetailFreelancer: React.FC = () => {
    
    const [title, setTitle] = useState<string>("");
    const [selectedProjectNeeds, setSelectedProjectNeeds] = useState<Option[]>([]);
    const [error, setError] = useState<string>("");

    
    const { userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userId = userInfo._id;
            const freelancerData = { userId, title };
            await saveFreelancerData(freelancerData );
            navigate("/fr/dashboard");
        } catch (error) {
            console.log("Error in saving freelancer details:", error);
            toast.error("Error while updating details!");
        }
    };


    const handleSelectionChange = (newSelectedOptions: Option[]) => {
        setSelectedProjectNeeds(newSelectedOptions);
    };

    const options=['html','css','js','react'];

    return (
        <div className="max-w-[38rem] mx-auto mt-36 p-6 bg-white rounded-lg mb-3">
            <h1 className="text-3xl font-extrabold mb-4">Welcome to Opportune. </h1>
            <p className="mb-6 text-gray-600">Tell us about you.</p>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label htmlFor="company-name" className="block mb-2">
                        Title
                    </Label>
                    <Input id="title" placeholder="eg: full stack developer" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full placeholder:text-xs" />
                </div>

                <div className="mb-4">
                    <Label htmlFor="skills" className="block mb-2">
                        Skills
                    </Label>

                    <MultiSelect options={options} maxSelections={5} onSelectionChange={handleSelectionChange} error={error} />
                    {error ? <span className="text-xs text-red-500 mt-2">choose the project needs</span> : ""}
                </div>

                <Button type="submit" className="w-full bg-green-800 hover:bg-green-900">
                    Continue
                </Button>
            </form>
        </div>
    );
};

export default DetailFreelancer;





