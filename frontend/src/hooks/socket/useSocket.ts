import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import createSocketConnection from "@/utils/socketConnection";

export const useSocket = (userId?: string) => {

    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {

        console.log('userId for socket connection:',userId);

        if (userId) {
            const newSocket = createSocketConnection(userId);
            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, []);

    return socket;
};
