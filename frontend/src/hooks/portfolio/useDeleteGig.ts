import { useQueryClient, useMutation } from "@tanstack/react-query";
import { removeGig } from "@/api/gigs";

export const useRemoveGig = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (gigId: string) => removeGig(gigId),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["gig"] });
        },
    });
};
