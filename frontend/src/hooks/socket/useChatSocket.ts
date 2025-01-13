import { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import createSocketConnection from "@/utils/socketConnection";

const SOCKET_URL = import.meta.env.VITE_CHAT_SOCKET_URL;

export const useChatSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
         const newSocket = createSocketConnection(SOCKET_URL);
         setSocket(newSocket);

         return () => {
            newSocket.disconnect();
         };
             
    }, []);

    return socket;
};
