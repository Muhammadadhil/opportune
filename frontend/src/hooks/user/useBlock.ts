// src/hooks/user/useToggleBlockStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleUserBlockStatus } from "@/api/admin";

export const useToggleBlockStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleUserBlockStatus,

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
