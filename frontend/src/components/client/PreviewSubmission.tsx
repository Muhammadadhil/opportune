import { Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useSubmission from "@/hooks/contracts/useSubmission";
import { acceptSubmission } from "@/api/contracts";

interface PreviewSubmissionProps {
    isOpen: boolean;
    onClose: () => void;
    contractId: string;
    milestoneId: string;
}

export function PreviewSubmission({ isOpen, onClose, contractId, milestoneId }: PreviewSubmissionProps) {
    
    const { data: submission,isLoading,error,refetch } = useSubmission(contractId, milestoneId);

    const handleAcceptSubmission = async (submissionId: string) => {
        console.log('submissionid:',submissionId)
        if (submissionId) {
            await acceptSubmission(submissionId);
            
            // adCh1: refetch the submission data after accepting it
            refetch();
            onClose();
        }
    }

    if (isLoading) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Loading Submission...</DialogTitle>
                    </DialogHeader>
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
                <DialogContent className="sm:max-w-md">
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Submission Details</DialogTitle>
                    <DialogDescription>Review the submitted work and download the attachment if available.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <p>Message</p>
                        <p className="text-sm text-muted-foreground">{submission?.message}</p>
                    </div>
                    {submission?.attachment && (
                        <div>
                            <p>Attachment</p>
                            <Button variant="outline" className="w-full" onClick={() => window.open(submission.attachment, "_blank")}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Attachment
                            </Button>
                        </div>
                    )}
                </div>

                {!submission?.isAccepted && (
                    <Button  className="w-full bg-green-700 hover:bg-green-600" onClick={() => handleAcceptSubmission(submission?._id as string)}> 
                        Accept Work
                    </Button>
                )}

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
