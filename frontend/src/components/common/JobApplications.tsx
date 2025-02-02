import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button1";
import { Badge } from "@/components/ui/badge";
import useApplications from "@/hooks/jobs/useApplications";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IApplication } from "@/types/IApplication";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { truncateString } from "@/utils/truncateString";
import { Skeleton } from "@/components/ui/skeleton";
import {motion} from "framer-motion";
import { fetchDownloadUrl } from "@/api/common";
import { useState } from "react";
import FilePreview from "./FilePreview";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface JobApplicationsProps {
    userType: "client" | "freelancer";
}

export const JobApplications: React.FC<JobApplicationsProps> = ({ userType }) => {

    const { userInfo } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const [cvDetails, setCvDetails] = useState({
    fileUrl: "",
    cvFileType: "",
    isPreviewOpen: false 
});    
  
    const userId = userInfo?._id;
    const { id: jobId } = useParams();

    const { data: Allapplications, isLoading } = useApplications(userId!, jobId!, userType);
    const applications = Allapplications?.data.applications;

    const handlePreviewCV = async (cvKey: string, cvFileType: string) => {
    try {
        const downloadUrl = await fetchDownloadUrl(cvKey);
        setCvDetails({
            fileUrl: downloadUrl,
            cvFileType: cvFileType,
            isPreviewOpen: true
        });
    } catch (error) {
        console.error("Failed to get preview URL:", error);
    }
}

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="w-full">
                        <CardHeader>
                            <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/4" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-28" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        );
    }

    if (!applications?.length) {
        return (
            <div className="flex flex-col items-center justify-center h-[200px]">
                <h2 className="text-xl font-semibold text-gray-700">No applications found</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div  initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {applications.map((app: IApplication) => (
                    <Card key={app._id} className="w-full">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="line-clamp-1 ">
                                        {userType === "client" ? (
                                            <span onClick={() => navigate(`/freelancer/${app.freelancerDetails?._id}`)} className="hover:text-blue-600 cursor-pointer">
                                                {app?.freelancerDetails?.firstname} {app?.freelancerDetails?.lastname}
                                            </span>
                                        ) : (
                                            truncateString(app?.jobDetails?.jobTitle ?? "")
                                        )}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        Applied on <span className="text-green-600">{new Date(app.createdAt!).toLocaleDateString()}</span>
                                    </p>
                                </div>
                                <Badge
                                    variant={app.status === "offerSent" ? "default" : "secondary"}
                                    className={`${app.status === "offerSent" ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"}`}
                                >
                                    {app.status === "offerSent" && userType === "freelancer" ? "Accepted" : app.status === "offerSent" && userType === "client" ? "Offer Sent" : app.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Application ID</span>
                                <span className="font-medium">APP{app._id}</span>
                            </div>
                            {app.jobDetails?.budget && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Budget</span>
                                    <span className="font-medium">${app.jobDetails.budget}</span>
                                </div>
                            )}
                            {userType === "client" && app.freelancerNotes && (
                                <div className="flex flex-col text-sm">
                                    <span className="font-medium ">freelancer notes: {app.freelancerNotes}</span>
                                    <span className="font-medium">freelancer price: {app.freelancerPrice}</span>
                                </div>
                            )}

                            

                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {/* <Button size="sm" variant="default">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {userType === "client" ? "Message freelancer" : "View Details"}
                            </Button> */}
                            {userType === "client" && app.cvKey && (
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handlePreviewCV(app.cvKey!,app.cvFileType!)}
                                    className="mt-2 border-2 border-gray-700 min-w-28"
                                >
                                    Preview CV
                                </Button>
                            )}

                            {userType === "client" && app.status === "pending" && (
                                <Button
                                    size="sm"
                                    className="bg-green-800 hover:bg-green-700"
                                    onClick={() =>
                                        navigate(`/cl/send-offer/${app.jobId}`, {
                                            state: { application: app },
                                        })
                                    }
                                >
                                    Send Offer
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </motion.div>

            {cvDetails.isPreviewOpen && cvDetails.fileUrl && (
                <Dialog open={cvDetails.isPreviewOpen} onOpenChange={(open) => !open && setCvDetails({ fileUrl: "", cvFileType: "", isPreviewOpen: false })}>
                    <DialogContent className=" min-h-[70vh]">
                        <DialogHeader>
                            <DialogTitle>CV Preview</DialogTitle>
                        </DialogHeader>

                        <FilePreview 
                            fileUrl={cvDetails.fileUrl}
                            fileType={cvDetails.cvFileType}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
