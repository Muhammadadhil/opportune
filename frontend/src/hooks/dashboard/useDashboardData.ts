import { getDashboardData } from "@/api/admin";
import { useQuery } from "@tanstack/react-query";

export function useDashboardData() {
    return useQuery({
        queryKey: ["admin-dashboard"],
        queryFn: () => getDashboardData(),
        staleTime: 60 * 1000,
    });
}
