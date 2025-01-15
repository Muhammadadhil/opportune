import { getReviews } from "@/api/portfolio";
import { useQuery } from "@tanstack/react-query";

export function useReviews(userId: string) {
    return useQuery({
        queryKey: ["reviews", userId],
        queryFn: () => getReviews(userId!),
        staleTime: 300000, // 5 minutes
        retry: 2,
        enabled: true,
    });
}