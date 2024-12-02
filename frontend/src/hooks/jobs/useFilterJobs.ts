import { getFilteredJobs } from "@/api/jobsApi";
import { useQuery } from "@tanstack/react-query";

export function useFilterJobs(filters: any) {

    console.log('filters in useFilterJobs:',filters);

    return useQuery({
        queryKey: ["jobs", filters],
        queryFn: () => getFilteredJobs(filters),
    });
}
