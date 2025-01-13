import { useQuery } from "@tanstack/react-query";
import {getMessages} from '@/api/chat';

export default function useMessages(chatRoomId:string) {
    return useQuery({
        queryKey: ["messages", chatRoomId],
        queryFn: () => getMessages(chatRoomId),
        enabled: !!chatRoomId,
        staleTime: 1000*60, 
        refetchOnWindowFocus: false,
    });
};
