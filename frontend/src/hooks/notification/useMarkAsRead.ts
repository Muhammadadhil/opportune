import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "@/api/notification"; // Assuming this is your API function
import { INotification } from "@/types/INotification"; // Import your notification type

export const useMarkNotificationAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation<INotification[], Error, string>({
        mutationFn: (id:string)=> markNotificationAsRead(id),

        onMutate: async () => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["notifications"] });

            // Snapshot the previous value
            const previousNotifications = queryClient.getQueryData<INotification[]>(["notifications"]);

            // Optimistically update to empty notifications
            queryClient.setQueryData(["notifications"], []);

            // Return a context object with the snapshotted value
            return { previousNotifications };
        },

        onError: (err, userId, context) => {
            // If the mutation fails, use the context to rollback
            queryClient.setQueryData(["notifications", userId], context?.previousNotifications);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
};
