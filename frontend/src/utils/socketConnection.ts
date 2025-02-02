import io from "socket.io-client";

const createSocketConnection = (socketUrl: string,socketPath?: string, userId?: string, userRole?: string) => {
    console.log("socektUrl socketPath pathh:", socketPath);

    const socket = io(socketUrl, {
        path: socketPath,
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });

    if (userId && userRole) {
        socket.emit("register", { userId, userRole });
    }

    socket.on("connect_error", (error) => {
        console.error("Connection Error:", error);
    });

    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!! creating socket connection 22',socket)

    return socket;
};

export default createSocketConnection;
