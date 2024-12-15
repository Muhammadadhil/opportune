import { getProfileData } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useFreelancerProfile(fId?: string) {
    return useQuery({
        queryKey: ["profile", fId],
        queryFn: () => getProfileData(fId as string),
        enabled: true,
    });
}
