import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveClientDetails } from "@/api/user";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../ui/MultiSelect";
import { RootState } from "@/store/store";
import { useCategories } from "@/hooks/useCategories";
import { ICategory } from "@/types/ICategory";


const DetailsClient: React.FC = () => {
    const [companyName, setCompanyName] = useState<string>("");
    const [companyDescription, setCompanyDescription] = useState<string>("");
    const [website, setWebsite] = useState<string>("");
    const [selectedProjectNeeds, setSelectedProjectNeeds] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const { userInfo } = useSelector((state:RootState) => state.user);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedProjectNeeds.length == 0) {
            setError("error in selectprojectneeds");
            return;
        }
        try {
            const userId = userInfo?._id;
            console.log("selectedProjectNeeds", selectedProjectNeeds);
            const projectNeeds = selectedProjectNeeds;
            console.log('project needs:',projectNeeds)
            const clientData = { userId, companyName, companyDescription, projectNeeds, website };
            console.log("clientData:", clientData);
            await saveClientDetails(clientData);
            navigate("/cl/dashboard");
        } catch (error) {
            console.log("Error in saving client details:", error);
            toast.error("Error while updating details!");
        }
    };

    const {data: categories} = useCategories();
    const categoryOptions = categories?.data?.map((category: ICategory) => category.name);


    const handleSelectionChange = (newSelectedOptions) => {
        setSelectedProjectNeeds(newSelectedOptions);
    };

    return (
        <div className="flex w-full min-h-screen bg-gradient-to-b from-green-50 dark:from-green-950 to-white dark:to-black items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md p-8">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
                        Complete Your Profile
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="companyName" className="text-gray-700 dark:text-gray-300">
                                Company Name
                            </Label>
                            <Input
                                id="companyName"
                                type="text"
                                placeholder="eg: opportune"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <Label htmlFor="companyDescription" className="text-gray-700 dark:text-gray-300">
                                Company Description
                            </Label>
                            <Input
                                id="companyDescription"
                                type="text"
                                placeholder="eg: marketing services"
                                value={companyDescription}
                                onChange={(e) => setCompanyDescription(e.target.value)}
                                className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <Label htmlFor="projectNeeds" className="text-gray-700 dark:text-gray-300">
                                Project Needs
                            </Label>
                            <MultiSelect options={categoryOptions} maxSelections={5} onSelectionChange={handleSelectionChange} error={error} />
                            {error ? <span className="text-xs text-red-500 mt-2">choose the project needs</span> : ""}
                        </div>

                        <div>
                            <Label htmlFor="website" className="text-gray-700 dark:text-gray-300">
                                Website (Optional)
                            </Label>
                            <Input
                                id="website"
                                type="url"
                                placeholder="eg: www.opportune.com"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">

                            <Button
                                type="submit"
                                className="bg-green-800 hover:bg-green-900 dark:bg-green-700 dark:hover:bg-green-800 text-white"
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DetailsClient;
