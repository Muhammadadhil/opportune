import { getFApplications } from "@/api/jobsApi";
import { useQuery } from "@tanstack/react-query";

export default function useFreelancerApplication(freelancerId: string) {
    return useQuery({
        queryKey: ["freelacerApplications"],
        queryFn: () => getFApplications(freelancerId),
    });
}
