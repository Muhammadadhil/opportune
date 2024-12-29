import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { acceptOffer } from "@/api/offers";


export const useAcceptSubmission = (): UseMutationResult<
    AxiosResponse<any, any>, 
    Error,
    { offerId: string; status: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ offerId, status }: { offerId: string; status: string }) => acceptOffer(offerId, status),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["offers"] });
        },
    });
};
