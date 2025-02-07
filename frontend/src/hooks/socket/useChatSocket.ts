import { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import createSocketConnection from "@/utils/socketConnection";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const SOCKET_URL = import.meta.env.VITE_NODE_ENV === "production" ? `wss://${import.meta.env.VITE_CHAT_SOCKET_URL}` : `ws://${import.meta.env.VITE_CHAT_SOCKET_URL}`;

console.log("SOCKET_URL chat:",SOCKET_URL);

export const useChatSocket = () => {

    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers,setOnlineUsers]= useState<string[]>([])

    const { userInfo } = useSelector((state: RootState) => state.user);


    useEffect(() => {

        if(!userInfo?._id) return ;

         const newSocket = createSocketConnection(SOCKET_URL, "/messaging-socket", userInfo?._id, userInfo?.role);
         setSocket(newSocket);

        const handleOnlineUsers = (users: string[]) => {
            setOnlineUsers(users);
        };

        const handleUserOnline = (userId: string) => {
            setOnlineUsers(prev => Array.from(new Set([...prev, userId])));
        };

        const handleUserOffline = (userId: string) => {
            setOnlineUsers(prev => prev.filter(id => id !== userId));
        };

        const handleReconnect = () => {
            // Re-register user after reconnection
            newSocket.emit('register', { userId: userInfo._id, userRole: userInfo.role });
        };

        newSocket.on('getOnlineUsers', handleOnlineUsers);
        newSocket.on('userOnline', handleUserOnline);
        newSocket.on('userOffline', handleUserOffline);
        newSocket.on('reconnect', handleReconnect);


         return () => {
            newSocket.off('getOnlineUsers', handleOnlineUsers);
            newSocket.off('userOnline', handleUserOnline);
            newSocket.off('userOffline', handleUserOffline);
            newSocket.off('reconnect', handleReconnect);
            newSocket.disconnect();
         };
             
    }, [userInfo]);

    return {socket,onlineUsers};
};
