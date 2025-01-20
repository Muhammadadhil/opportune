import io from "socket.io-client";

const createSocketConnection = (socketUrl: string, userId?: string, userRole?: string) => {
    
    // console.log("socektUrl connection url:", socketUrl);
    
    const socket = io(socketUrl, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });

    if (userId && userRole) {
        socket.emit("register", {userId, userRole});
    }

    socket.on("connect_error", (error) => {
        console.error("Connection Error:", error);
    });

    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!! creating socket connection 22',socket)

    return socket;
};

export default createSocketConnection;
