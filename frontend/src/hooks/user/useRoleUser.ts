import { fetchUserInfo } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useRoleUser(userId: string,role:'client'| 'freelancer') {
    return useQuery({
        queryKey: ['userDetails',userId,role],
        queryFn: () => fetchUserInfo(userId,role),
        enabled: true,
    });
}
