import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import createSocketConnection from "@/utils/socketConnection";


const env = import.meta.env.VITE_NODE_ENV.trim();
const SOCKET_URL = env == "production" ? `wss://${import.meta.env.VITE_NOTIFICATION_SOCKET_URL}` : `ws://${import.meta.env.VITE_NOTIFICATION_SOCKET_URL}`;
console.log("Comparison result:", import.meta.env.VITE_NODE_ENV == "production");
    
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
