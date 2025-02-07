import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import createSocketConnection from "@/utils/socketConnection";

console.log("import.meta.env.VITE_NODE_ENV::", import.meta.env.VITE_NODE_ENV);

const SOCKET_URL = import.meta.env.NODE_ENV != "production" ? `ws://${import.meta.env.VITE_NOTIFICATION_SOCKET_URL}` : `wss://${import.meta.env.VITE_NOTIFICATION_SOCKET_URL}`;
console.log("socket url for notification:", SOCKET_URL);
    
export const useSocket = (userId?: string, userRole?: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        console.log("userId for socket connection:", userId);

        if (userId) {
            const newSocket = createSocketConnection(SOCKET_URL,'/notification-socket', userId, userRole);
            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, []);

    return socket;
};
