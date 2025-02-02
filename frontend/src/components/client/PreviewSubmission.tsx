import { useState } from "react";
import { Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button1";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useSubmission from "@/hooks/contracts/useSubmission";
import { acceptSubmission } from "@/api/contracts";
import { fetchDownloadUrl } from "@/api/common";
import { toast } from "react-hot-toast";
import { ReviewForm } from "../common/ReviewForm";
import { downloadFile } from "@/utils/downloadFile";

interface PreviewSubmissionProps {
    userType: "client" | "freelancer";
    isOpen: boolean;
    onClose: () => void;
    contractId: string;
    milestoneId: string;
    isFinalMilestone: boolean;
}

export function PreviewSubmission({ userType, isOpen, onClose, contractId, milestoneId, isFinalMilestone }: PreviewSubmissionProps) {
    const { data: submission, isLoading, error, refetch } = useSubmission(contractId, milestoneId);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    console.log("submission:", submission);

    const handleAcceptSubmission = async (submissionId: string) => {
        setIsAccepting(true);
        try {
            await acceptSubmission(submissionId);
            toast.success("Submission accepted successfully");
            if (isFinalMilestone) {
                setShowReviewForm(true);
            } else {
                onClose();
            }

            await refetch();
        } catch (error) {
            console.error("Error accepting submission", error);
            toast.error("Error accepting submission");
        } finally {
            setIsAccepting(false);
        }
    };

    const handleReviewSubmit = () => {
        setShowReviewForm(false);
        onClose();
    };

    const handleDownloadAttachment = async (fileName: string) => {
    try {
        setIsDownloading(true);
        const downloadUrl = await fetchDownloadUrl(fileName);
        await downloadFile(downloadUrl, "opportune-submission-file");
    } catch (error) {
        console.error("Download failed:", error);
        // You might want to show a toast message here
    } finally {
        setIsDownloading(false);
    }
};

    if (isLoading) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <div className="flex justify-center items-center h-32">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (error) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Error Loading Submission</DialogTitle>
                    </DialogHeader>
                    <div className="text-center text-red-600">An error occurred while fetching the submission data.</div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] md:min-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Submission Details</DialogTitle>
                    <DialogDescription>Review the submitted work and download the attachment if available.</DialogDescription>
                </DialogHeader>
                <Card>
                    <CardHeader>
                        <CardTitle>Submitted Work</CardTitle>
                        <CardDescription>{submission?.createdAt && new Date(submission.createdAt).toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Message</Label>
                            <p className="text-sm text-muted-foreground">{submission?.message}</p>
                        </div>

                        {submission?.attachment && (
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full" onClick={()=> handleDownloadAttachment(submission?.attachment)}>
                                    <Download className="mr-2 h-4 w-4" />
                                    {isDownloading ? "Downloading..." : "Download Attachment"}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {userType === "client" && !submission?.isAccepted && (
                    <div>
                        <Button className="w-full mt-4 bg-green-700 hover:bg-green-600" onClick={() => handleAcceptSubmission(submission?._id as string)} disabled={isAccepting}>
                            {isAccepting ? "Accepting..." : "Accept Work"}
                        </Button>
                        <p className="text-sm mt-5 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                            <span className="font-bold">Note:</span> By accepting the work, the amount you paid for the freelancer will be transferred to his/her account.
                        </p>
                    </div>
                )}

                {showReviewForm && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
                        <ReviewForm contractId={contractId} onSubmit={handleReviewSubmit} />
                    </div>
                )}
                
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
