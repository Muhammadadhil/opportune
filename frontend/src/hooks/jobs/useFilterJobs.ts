import { getFilteredJobs } from "@/api/job";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useFilterJobs(filters: any,page:number,limit:number) {

    // console.log("pagination & filters in useFilterJobs:", { filters, page , limit});

    return useQuery({
        queryKey: ["jobs", { filters, page, limit }],
        queryFn: () => getFilteredJobs(filters, page, limit),
        staleTime: 600000, //10 minutes
        keepPreviousData: true,
    } as UseQueryOptions);
}
