import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveClientDetails } from "@/api/userApi";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import IClientData from "@/types/IClientData";
import MultiSelect from "../ui/MultiSelect";


const DetailsClient: React.FC = () => {
    const [companyName, setCompanyName] = useState<string>("");
    const [companyDescription, setCompanyDescription] = useState<string>("");
    const [website, setWebsite] = useState<string>("");
    const [selectedProjectNeeds, setSelectedProjectNeeds] = useState<Option[]>([]);
    const [error, setError] = useState<string>("");

    const { userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedProjectNeeds.length == 0) {
            setError("error in selectprojectneeds");
            return;
        }
        try {
            const userId = userInfo._id;
            const projectNeeds = selectedProjectNeeds;
            const clientData = { userId, companyName, companyDescription, projectNeeds, website };
            await saveClientDetails(clientData as IClientData);
            navigate("/cl/dashboard");
        } catch (error) {
            console.log("Error in saving client details:", error);
            toast.error("Error while updating details!");
        }
    };

    const options = ["web development", "mobile app development", "content writing", "graphic designing", "copy writing", "ui-ux designing"];

    const handleSelectionChange = (newSelectedOptions: Option[]) => {
        setSelectedProjectNeeds(newSelectedOptions);
    };

    return (
        <div className="max-w-[38rem] mx-auto mt-36 p-6 bg-white rounded-lg mb-3">
            <h1 className="text-3xl font-extrabold mb-4">Welcome to Opportune. </h1>
            <p className="mb-6 text-gray-600">Tell us about your business and you'll be on your way to connect with talent.</p>

            <form onSubmit={handleSubmit}>
                {/* <div className="mb-6"> */}
                {/* <Label className="block mb-4">How many people are in your company?</Label>
                    <RadioGroup value={companySize} onValueChange={setCompanySize}>
                        <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="just-me" id="just-me" />
                            <Label htmlFor="just-me">It's just me</Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="2-9" id="2-9" />
                            <Label htmlFor="2-9">2-9 employees</Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="10-99" id="10-99" />
                            <Label htmlFor="10-99">10-99 employees</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value="100-1000" id="100-1000" />
                            <Label htmlFor="100-1000">100-1,000 employees</Label>
                        </div>
                        
                    </RadioGroup> */}
                {/* </div> */}

                <div className="mb-4 relative">
                    <Label htmlFor="company-name" className="block mb-2">
                        Company Name
                    </Label>
                    <span className="absolute right-0 text-xs text-gray-600"> *optional</span>
                    <Input id="company-name" placeholder="eg: opportune" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full placeholder:text-xs" />
                </div>
                <div className="mb-4">
                    <Label htmlFor="company-description" className="block mb-2">
                        Company Description
                    </Label>
                    <Input
                        id="company-description"
                        placeholder="eg: marketing services"
                        value={companyDescription}
                        onChange={(e) => setCompanyDescription(e.target.value)}
                        className="w-full placeholder:text-xs"
                    />
                </div>

                <div className="mb-4">
                    <Label htmlFor="project-needs" className="block mb-2">
                        Project Needs
                    </Label>

                    <MultiSelect options={options} maxSelections={5} onSelectionChange={handleSelectionChange} error={error} />
                    {error ? <span className="text-xs text-red-500 mt-2">choose the project needs</span> : ""}
                </div>

                <div className="mb-6">
                    <Label htmlFor="website" className="block mb-2">
                        Website
                    </Label>
                    <Input id="website" placeholder="eg: www.opportune.com" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full placeholder:text-xs" />
                </div>

                <Button type="submit" className="w-full bg-green-800 hover:bg-green-900">
                    Continue
                </Button>
            </form>
        </div>
    );
};

export default DetailsClient;
