import { getOffers } from "@/api/jobsApi";
import { useQuery } from "@tanstack/react-query";

export default function useFreelancerOffers(freelancerId: string | null) {
    return useQuery({
        queryKey: ["FreelancerOffers"],
        queryFn: () => getOffers(freelancerId!,'freelancer'),
        enabled: !!freelancerId
    });
}
