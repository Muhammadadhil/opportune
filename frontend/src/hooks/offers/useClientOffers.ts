import { getOffers } from "@/api/offers";
import { useQuery } from "@tanstack/react-query";

export default function useClientOffers(userId: string | null) {
    return useQuery({
        queryKey: ["ClientOffers"],
        queryFn: () => getOffers(userId!, "client"),
        enabled: !!userId,
    });
}
