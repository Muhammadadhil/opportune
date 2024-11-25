

import { getJobDetails } from "@/api/jobsApi";
import { useQuery } from "@tanstack/react-query";

export function useJobDetails(jobId: string) {
    return useQuery({
        queryKey: ["jobdetails"],
        queryFn: () => getJobDetails(jobId),
        retry: 1,
    });
}