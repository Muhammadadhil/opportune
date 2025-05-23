import { getJobs } from "@/api/job";
import { useQuery } from "@tanstack/react-query";

export function useJobs(clientId?:string) {
    return useQuery({
        queryKey:  clientId ? ["job", clientId] : ["jobs"],
        queryFn: () => getJobs(clientId), 
        staleTime: 10000,
        refetchOnWindowFocus: true,
        retry: 1, 
    });
}