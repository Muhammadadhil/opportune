import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button1";
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
import { Upload ,FileText} from "lucide-react";
import { Loader2, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCV,getUploadSignedUrl,saveCVDetails } from "@/api/cv";
import { getApplicationDetails } from "@/api/job";
import axios from "axios";
import { formatDate } from "@/utils/dateFormatter";
import { handleApiError } from "@/api/errorHandler";

interface JobSideBarProps {
    job: IJob;
    sheetOpen: boolean;
    setSheetOpen: (open: boolean) => void;
    onApply?: () => void;
}


interface CV {
  url: string;
  cvDetails: {
    cvKey: string;
    fileName: string;
    fileType: string;
    uploadedAt: string;
  }
}

interface ApplicationDetails {
    freelancerNotes?: string;
    freelancerPrice?: number;
    status?: string;
    createdAt?: string;
}

const JobSideBar: React.FC<JobSideBarProps> = ({ job, sheetOpen, setSheetOpen, onApply }) => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [price, setPrice] = useState("");
    const [isUploading, setIsUploading] = useState(false);


     const { data: cvData } = useQuery({
        queryKey: ['cv', userInfo?._id],
        queryFn: () => getCV(userInfo?._id ?? ''),
        enabled: !!userInfo?._id
    });

    const { data: applicationDetails } = useQuery<ApplicationDetails>({
        queryKey: ['application', job._id, userInfo?._id],
        queryFn: () => getApplicationDetails(job._id!, userInfo?._id ?? ''),
        enabled: !!job.isApplied && !!userInfo?._id
    });

    console.log("applicationDetails:", applicationDetails);
    
    const [cvSelectionMode, setCvSelectionMode] = useState<'existing' | 'new'>(
        cvData?.cvs?.length > 0 ? 'existing' : 'new'
    );
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [selectedCV, setSelectedCV] = useState<CV | null>(null);



    const applicationData: IApplication = {
        jobId: job._id!,
        clientId: job.clientId?._id ?? "",
        freelancerId: userInfo?._id ?? "",
        freelancerNotes: message,
        freelancerPrice: Number(price),
    };

    const validateFile = (file: File) => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            toast.error('Please upload a PDF or image file (JPEG/PNG)');
            return false;
        }
        if (file.size > maxSize) {
            toast.error('File size should be less than 5MB');
            return false;
        }
        return true;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && validateFile(file)) {
            setCvFile(file);
        }
    };


    const handleJobApply = async () => {

        if ( !cvFile && !selectedCV) {
            toast.error("Please upload a CV or select an existing one");
            return;
        }else if( price && Number(price) <= 0) {
            toast.error("Please enter a valid price");
            return;
        }
            try {
                setIsUploading(true);
                let cvKey;
                let fileName;
                let fileType;

                if (selectedCV) {
                    // Use selected existing CV
                    cvKey = selectedCV.cvDetails?.cvKey;
                    fileName = selectedCV.cvDetails.fileName;
                    fileType = selectedCV.cvDetails.fileType;
                } else if (cvFile) {
                    // Upload new CV

                    const presignedData = await getUploadSignedUrl(cvFile.name, cvFile.type);
                    await axios.put(presignedData.url, cvFile, {
                        headers: {
                            "Content-Type": cvFile.type,
                        },
                    });

                    cvKey = presignedData.fileKey;
                    fileName = cvFile.name;
                    fileType = cvFile.type;

                    await saveCVDetails(userInfo?._id, {
                        cvKey,
                        fileName,
                        fileType,
                    });
                }

                const data = {
                    ...applicationData,
                    cvKey,
                    cvFileType: fileType,
                };

                await applyJob(data);
                toast.success("Application Submitted");
                setSheetOpen(false);
                if (onApply) onApply();
            } catch (error) {
                console.log("Error in apply job:", error);
                // const axiosError = error as AxiosError;
                // const data = axiosError.response?.data as { message: string };
                // console.log('dataL',data)
                if (error.response?.status === 422) {
                    toast.error("Please complete your profile first");
                    return false;
                }
                const errorMessage = handleApiError(error);
                toast.error(errorMessage);
            } finally {
                setIsUploading(false);
            }
    };

    const navigate = useNavigate();

    const handleNavigateProfile = (userId: string) => {
        navigate("/user/" + userId);
    };

    const fullStars = Math.floor(job?.clientId?.averageRating || 0);


    return (
        <div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-full max-w-[90vw] sm:max-w-[800px] bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800" side="right" forceMount>
                    <SheetHeader className="p-6 border-b border-gray-200 dark:border-gray-800">
                        <SheetTitle className="text-gray-900 dark:text-white">{job.jobTitle}</SheetTitle>
                        <div className="flex justify-between items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>
                                {job.category} / {job.subCategory}
                            </span>
                            <span>Budget: ${job.budget}</span>
                        </div>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-10rem)] mt-6 pr-4">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Client Details</h3>
                                <p className="hover:text-green-600 cursor-pointer text-gray-700 dark:text-gray-300" onClick={() => handleNavigateProfile(job.clientId._id)}>
                                    {job?.clientId?.firstname + " " + job?.clientId?.lastname}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">{job.clientId?.email}</p>
                                {/* Rating */}
                                <div className="flex items-center gap-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, index) => (
                                            <Star
                                                key={index}
                                                className={`w-4 h-4 ${index < fullStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-700 fill-gray-300 dark:fill-gray-700"}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">({userInfo?.reviewCount})</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Job Description</h3>
                                <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Requirements</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {job.skillsRequired.map((skill, index) => (
                                        <li key={index} className="text-gray-700 dark:text-gray-300">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <SheetFooter className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                            {isApplyOpen && (
                                <div className="w-full space-y-4 flex flex-col p-2">
                                    <div className="space-y-2">
                                        {cvData?.cvs?.length > 0 && (
                                            <div className="flex gap-2 mb-4">
                                                <Button type="button" variant={cvSelectionMode === "existing" ? "default" : "outline"} onClick={() => setCvSelectionMode("existing")}>
                                                    Use Existing CV
                                                </Button>
                                                <Button type="button" variant={cvSelectionMode === "new" ? "default" : "outline"} onClick={() => setCvSelectionMode("new")}>
                                                    Upload New CV
                                                </Button>
                                            </div>
                                        )}

                                        {cvSelectionMode === "existing" && cvData?.cvs?.length > 0 && (
                                            <div className="space-y-2">
                                                <Label>Select CV</Label>
                                                {cvData.cvs.map((cv: CV, index: number) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => setSelectedCV(cv)}
                                                        className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-200 rounded-xl ${
                                                            selectedCV === cv ? "bg-gray-200 border border-green-800" : "bg-gray-100"
                                                        }`}
                                                    >
                                                        <input type="radio" name="cv-selection" checked={selectedCV === cv} onChange={() => setSelectedCV(cv)} className="h-4 w-4" />
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="w-4 h-4" />
                                                            <span className="text-sm text-gray-600">{cv?.cvDetails?.fileName}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {cvSelectionMode === "new" && (
                                            <div className="space-y-2">
                                                <Label>Upload New CV</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input id="cv" type="file" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                                                    <Button type="button" variant="outline" onClick={() => document.getElementById("cv")?.click()}>
                                                        <Upload className="mr-2 h-4 w-4" />
                                                        {cvFile ? cvFile.name : "Choose File"}
                                                    </Button>

                                                    {cvFile && (
                                                        <Button type="button" variant="ghost" size="sm" onClick={() => setCvFile(null)}>
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>

                                                {cvFile && (
                                                    <div className="mt-4">
                                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                                                            <FileText className="w-4 h-4 text-gray-600" />
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-medium">{cvFile.name}</span>
                                                                <span className="text-xs text-gray-500">{(cvFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <Label>
                                        Cover Letter <span className="text-xs text-gray-500">* optional</span>
                                    </Label>
                                    <Textarea placeholder="Leave your cover letter here" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={300} />
                                    <Label>
                                        Your Price <span className="text-xs text-gray-500">* optional</span>
                                    </Label>
                                    <Input placeholder="Your price $" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                                    <Button onClick={handleJobApply} className="self-end bg-green-700 hover:bg-green-600 mt-8 justify-end min-w-">
                                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Application"}
                                    </Button>
                                </div>
                            )}

                            {!isApplyOpen && job.isApplied === true && applicationDetails && (
                                <div className="w-full space-y-4">
                                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                                        <h3 className="font-semibold mb-3 text-green-600 dark:text-green-500">Application Sent</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                                <span className="font-medium capitalize text-gray-900 dark:text-white">{applicationDetails.status}</span>
                                            </div>

                                            {applicationDetails.freelancerPrice !== null && applicationDetails.freelancerPrice !== undefined && applicationDetails.freelancerPrice > 0 && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Your Proposed Price:</span>
                                                    <span className="font-medium">${applicationDetails.freelancerPrice}</span>
                                                </div>
                                            )}
                                            {applicationDetails.freelancerNotes && (
                                                <div className="mt-3">
                                                    <span className="text-gray-600 dark:text-gray-400">Your Message:</span>
                                                    <p className="mt-1 text-gray-700 dark:text-gray-300">{applicationDetails.freelancerNotes}</p>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Applied on:</span>
                                                <span className="font-medium">{formatDate(applicationDetails.createdAt!)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!isApplyOpen && job.isApplied !== true && userInfo?._id && (
                                <Button onClick={() => setIsApplyOpen(true)} className="bg-green-800 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white mt-8 justify-end">
                                    Apply Now
                                </Button>
                            )}

                            {!userInfo?._id && (
                                <Button onClick={() => navigate("/login")} className="bg-green-800 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white mt-8 justify-end">
                                    Login to Apply
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
