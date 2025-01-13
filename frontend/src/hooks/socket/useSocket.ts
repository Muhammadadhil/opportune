import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import createSocketConnection from "@/utils/socketConnection";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useSocket = (userId?: string, userRole?:string) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        console.log("userId for socket connection:", userId);

        if (userId) {
            const newSocket = createSocketConnection(SOCKET_URL, userId, userRole);
            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, []);

    return socket;
};
