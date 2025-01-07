import { getAdminTransactions } from "@/api/admin";
import { useQuery } from "@tanstack/react-query";

export function useAdminTransactions() {
    return useQuery({
        queryKey: ["admin-transactions"],
        queryFn: () => getAdminTransactions(),
        staleTime: 60 * 1000,
    });
}
