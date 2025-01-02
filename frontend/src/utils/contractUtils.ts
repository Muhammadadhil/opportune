import { getUploadUrl, submitWork } from "@/api/contracts";
import { ISubmission } from "@/types/ISubmisssion";
import axios from "axios";
import toast from "react-hot-toast";

export const handleSubmitWork = async (
    selectedMilestone: {
        id: string;
        amount: number;
        clientId: string;
        contractId: string;
        freelancerId: string;
    } | null,
    message: string,
    file: File | null,
    refetch: () => void
) => {
    try {
        if (!selectedMilestone) return;
        let presignedData;

        if (file) {
            presignedData = await getUploadUrl(file.name, file.type);
            await axios.put(presignedData.url, file, {
                headers: {
                    "Content-Type": file.type,
                },
            });
        }

        const submissionData: ISubmission = {
            milestoneId: selectedMilestone.id,
            contractId: selectedMilestone.contractId,
            freelancerId: selectedMilestone.freelancerId,
            clientId: selectedMilestone.clientId,
            message,
            attachment: presignedData?.fileUrl || null,
        };

        const response = await submitWork(submissionData);
        console.log("response submit work:", response);

        refetch();
        toast.success("Successfully submitted work for review to the client");
    } catch (error) {
        console.log("error submit work:", error);
        toast.error("An error occurred. Please try again later");
    }
};
