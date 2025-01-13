import { getOffers } from "@/api/offers";
import { useQuery } from "@tanstack/react-query";

export default function useFreelancerOffers(freelancerId: string | null) {
    return useQuery({
        queryKey: ["offers"],
        queryFn: () => getOffers(freelancerId!,'freelancer'),
        enabled: !!freelancerId
    });
}
