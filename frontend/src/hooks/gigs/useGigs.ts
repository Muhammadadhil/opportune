import { fetchGigs } from "@/api/gigsApi";
import { useQuery } from "@tanstack/react-query";

export function useGigs(fId?: string) {
    return useQuery({
        queryKey: fId ? ["gig", fId] : ["gigs"],
        queryFn: () => fetchGigs(fId),
        staleTime: 300000, // 5 minutes
        refetchOnWindowFocus: true,
        retry: 1, 
    });
}
