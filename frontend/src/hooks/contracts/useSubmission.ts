

import { useQuery } from "@tanstack/react-query";
import { ISubmission } from "@/types/ISubmisssion";
import { fetchSubmission } from "@/api/contracts";

export default function useSubmission(contractId: string,milestoneId:string) {
    return useQuery<ISubmission>({
        queryKey: ["submission", contractId, milestoneId],
        queryFn: () => fetchSubmission(contractId, milestoneId),
        enabled: !!contractId && !!milestoneId,
        staleTime: 60000,
    })
}