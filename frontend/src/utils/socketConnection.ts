import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const createSocketConnection = (userId?: string) => {

    const socket = io(SOCKET_URL, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });
    
    socket.on("connect_error", (error) => {
        console.error("Connection Error:", error);
    });

    if (userId) {
        socket.emit("register", userId);
    }


    return socket;
};

export default createSocketConnection;
