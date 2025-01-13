import { getUserById } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useRoleUser(userId: string) {
    return useQuery({
        queryKey: ["userDetails", userId],
        queryFn: () => getUserById(userId),
        enabled: true,
    });
}
