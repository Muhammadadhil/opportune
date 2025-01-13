import { getClientProfileData } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useClientProfile(cId?: string) {
    return useQuery({
        queryKey: ["profile", cId],
        queryFn: () => getClientProfileData(cId as string),
        enabled: true,
    });
}
