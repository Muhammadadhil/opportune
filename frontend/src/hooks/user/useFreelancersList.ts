import { fetchFreelancers } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useFreelancersList() {
    return useQuery({
        queryKey: ["freelancers"],
        queryFn: () => fetchFreelancers(),
    });
}
