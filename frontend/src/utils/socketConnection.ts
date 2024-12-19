import io from "socket.io-client";

const createSocketConnection = (socketUrl:string,userId?: string) => {

    console.log('socektUrl connection url:',socketUrl);

    const socket = io(socketUrl, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });
    
    if (userId) {
        socket.emit("register", userId);
    }
    
    socket.on("connect_error", (error) => {
        console.error("Connection Error:", error);
    });



    return socket;
};

export default createSocketConnection;
