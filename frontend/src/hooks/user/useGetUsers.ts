import { getUsers } from "@/api/admin";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useGetUsers(searchKey: string, page: number, limit: number) {

    console.log('getting userr useGetUsers!!')

    return useQuery({
        queryKey: ["users", { searchKey, page, limit }],
        queryFn: () => getUsers(searchKey, page, limit),
        // staleTime: 600000,
    } as UseQueryOptions);
}
