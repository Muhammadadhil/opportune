import { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import createSocketConnection from "@/utils/socketConnection";

const SOCKET_URL = import.meta.env.VITE_CHAT_SOCKET_URL;

export const useChatSocket = (userId?: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        console.log("userId for socket connection:", userId);

        if (userId) {
            const newSocket = createSocketConnection(userId, SOCKET_URL);
            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, []);

    return socket;
};
