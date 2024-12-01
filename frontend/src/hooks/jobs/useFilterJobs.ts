import { getJobs } from "@/api/jobsApi";
import { useQuery } from "@tanstack/react-query";

export function useFilterJobs(filters: any) {
    return useQuery({
        queryKey: ["jobs",filters],
        queryFn: () => getJobs(),
    });
}
