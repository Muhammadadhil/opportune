import { getProfileData } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useFreelancerProfile(role?:string,fId?: string,) {
    return useQuery({
        queryKey: ["profile", fId],
        queryFn: () => getProfileData(fId as string),
        enabled: role === "freelancer",
    });
}
