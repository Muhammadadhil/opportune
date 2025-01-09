import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { IJob } from "@/types/IJob";
import { applyJob } from "@/api/job";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { IApplication } from "@/types/IApplication";
import { AxiosError } from "axios";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobSideBarProps {
    job: IJob;
    sheetOpen: boolean;
    setSheetOpen: (open: boolean) => void;
    onApply?: () => void;
}

const JobSideBar: React.FC<JobSideBarProps> = ({ job, sheetOpen, setSheetOpen, onApply }) => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [price, setPrice] = useState("");

    const applicationData: IApplication = {
        jobId: job._id!,
        clientId: job.clientId?._id,
        freelancerId: userInfo?._id ?? "",
        freelancerNotes: message,
        freelancerPrice: Number(price),
    };

    const handleJobApply = async () => {
        try {
            await applyJob(applicationData);
            toast.success("Your application has sent successfully");
            setSheetOpen(false);
            if (onApply) onApply();
        } catch (error) {
            console.log("Error in apply job:", error);
            const axiosError = error as AxiosError;
            const data = axiosError.response?.data as { message: string };
            toast.error(data?.message || "An error occurred");
        }
    };

    const navigate = useNavigate();

    const handleNavigateProfile = (userId: string) => {
        navigate("/freelancer/" + userId);
    };

    const fullStars = Math.floor(job?.clientId?.averageRating || 0);

    return (
        <div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-full max-w-[90vw] sm:max-w-[800px] " side="right" forceMount>
                    <SheetHeader className="p-6 border-b">
                        <SheetTitle>{job.jobTitle}</SheetTitle>
                        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                            <span>
                                {job.category} / {job.subCategory}
                            </span>
                            <span>Budget: ${job.budget}</span>
                        </div>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-10rem)] mt-6 pr-4">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">Client Details</h3>
                                <p className="hover:text-blue-600 cursor-pointer " onClick={() => handleNavigateProfile(job.clientId._id)}>
                                    {job?.clientId?.firstname + " " + job?.clientId?.lastname}
                                </p>
                                <p>{job.clientId?.email}</p>
                                {/* Rating */}
                                <div className="flex items-center gap-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, index) => (
                                            <Star key={index} className={`w-4 h-4 ${index < fullStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`} />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">({userInfo?.reviewCount})</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Job Description</h3>
                                <p>{job.description}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Requirements</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {job.skillsRequired.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <SheetFooter className="mt-6 pt-6 border-t ">
                            {isApplyOpen && (
                                <div className="w-full space-y-4 flex flex-col p-2">
                                    <Label>Your Message</Label>
                                    <Textarea placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={300} />
                                    <Label>Your Price</Label>
                                    <Input placeholder="Your price $" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    <Button onClick={handleJobApply} className="self-end  bg-blue-800 hover:bg-blue-700 mt-8 justify-end">
                                        Submit Application
                                    </Button>
                                </div>
                            )}

                            {!isApplyOpen && job.isApplied !== true && userInfo?._id && (
                                <Button onClick={() => setIsApplyOpen(true)} className="bg-green-800 hover:bg-green-700 mt-8 justify-end">
                                    Apply Now
                                </Button>
                            )}
                        </SheetFooter>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default JobSideBar;
