import { getCategories } from "@/api/admin";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
        staleTime: 300000, // 5 minutes
        enabled: true,
    });
}
