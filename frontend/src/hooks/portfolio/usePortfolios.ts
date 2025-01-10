import { getPorfolios } from "@/api/portfolio";
import { useQuery } from "@tanstack/react-query";

export function usePortfolios(userId: string) {
    return useQuery({
        queryKey: ["portfolios", userId],
        queryFn: () => getPorfolios(userId!),
        staleTime: 300000, // 5 minutes
        retry: 2,
        enabled: true,
    });
}
