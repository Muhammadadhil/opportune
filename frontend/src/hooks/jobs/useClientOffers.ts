import { getOffers } from "@/api/jobsApi";
import { useQuery } from "@tanstack/react-query";

export default function useClientOffers(userId: string | null) {
    return useQuery({
        queryKey: ["ClientOffers",userId],
        queryFn: () => getOffers(userId!, "client"),
        enabled: !!userId,
    });
}
