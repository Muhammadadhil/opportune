import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { acceptOffer } from "@/api/offers";
import { IOffer } from "@/types/IOffer";


export const useAcceptOffer = (): UseMutationResult<
    AxiosResponse<any, any>, // Mutation response type
    Error,
    { offerId: string; status: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({offerId,status}:{offerId: string, status: string}) => acceptOffer(offerId, status),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["offers"] });
        },
    });
};
