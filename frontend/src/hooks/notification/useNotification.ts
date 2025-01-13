import { useQuery } from "@tanstack/react-query";
import {getUserNotifications} from '@/api/notification';

const useNotification = (userId:string) => {
    return useQuery({
        queryKey: ["notifications",userId],
        queryFn: () => getUserNotifications(userId),
        staleTime: 300000,     
        refetchOnWindowFocus: true,
        retry: 1,
    });
}

export default useNotification;
