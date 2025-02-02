import { getUsers } from "@/api/admin";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers(searchKey: string, page: number, limit: number) {
    return useQuery({
        queryKey: ["users", { searchKey, page, limit }],
        queryFn: () => getUsers(searchKey, page, limit),
        // staleTime: 600000,
    });
}
