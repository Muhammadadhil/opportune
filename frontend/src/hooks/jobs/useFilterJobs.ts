import { getFilteredJobs } from "@/api/job";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useFilterJobs(filters: any,page:number,limit:number) {
    return useQuery({
        queryKey: ["jobs", { filters, page, limit }],
        queryFn: () => getFilteredJobs(filters, page, limit),
        staleTime: 600000, //10 minutes
        keepPreviousData: true,
    } as UseQueryOptions);
}
