import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "@/api/notification"; // Assuming this is your API function
import { INotification } from "@/types/INotification"; // Import your notification type

export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation<INotification[], Error, string>({
        mutationFn: (id:string)=> markNotificationAsRead(id),

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
};
