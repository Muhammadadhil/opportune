import { getJobs } from "@/api/jobsApi";
import { useQuery } from "@tanstack/react-query";

export function useJobs(clientId:string) {
    return useQuery({
        queryKey: clientId ? ["job", clientId] : ["jobs"],
        queryFn: () => getJobs(clientId), 
        staleTime: 300000, // 5 minutes
        refetchOnWindowFocus: true,
        retry: 1, // Retry once on failure
    });
}