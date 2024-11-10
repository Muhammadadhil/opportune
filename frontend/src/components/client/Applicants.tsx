import { getJobs } from "@/api/userApi";
import { IJob } from "@/types/IJob";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
 



const Applicants = () => {
    const [jobs, setJobs] = useState<IJob[]>();
    const { userInfo } = useSelector((state: RootState) => state.user);

    const fetchJobs = async () => {
        console.log("fetching jobs !!!");

        const response = await getJobs(userInfo?._id as string);
        console.log("jobs response:", response.data);
        setJobs(response.data);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="container mx-auto py-8 max-w-7xl">
            <div className="p-4 md:p-6 max-w-4xl">
                <h2 className="text-xl font-semibold mb-4">Your Jobs</h2>
                <ul className="space-y-4">
                    {jobs?.map((job, index) => (
                        <li key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                            <div className="flex justify-between">
                                <h3 className="font-bold text-lg mb-2 ">{job?.jobTitle}</h3>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Ellipsis />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Modify Job</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                Edit Job
                                                <DropdownMenuShortcut>
                                                    <Pencil size={16} />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem>
                                                Delete Job
                                                <DropdownMenuShortcut>
                                                    <Trash2 size={16} />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <p className="text-gray-600 mb-2">{job?.description}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {job?.searchTags?.map((tag, idx) => (
                                    <span key={idx} className="bg-zinc-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                                <span>Budget: ${job?.budget}</span>
                                <span>Skills: {job?.skillsRequired.join(" • ")}</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-2">
                                <span>
                                    Category: {job?.category} &gt; {job?.subCategory}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Applicants;
