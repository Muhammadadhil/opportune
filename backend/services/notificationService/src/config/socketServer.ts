
import { Server } from "socket.io";

let io: Server;

export const initSocketServer = (httpServer:any)=> {

    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
        path: "/notification-socket",
    });

    io.on('connection', (socket) => {

        socket.on('register',(data) => {
            const {userId,userRole} = data;
            socket.join(userId);
            socket.join(userRole);

            console.log(`User ${userId} registered as ${userRole}`);
        })

        socket.on('disconnect', () => {
            console.log('Notification : Client disconnected');
        });

    });

    return io;
}

export const getIo=()=>{
    if(!io){
        throw new Error("Socket server not initialized");
    }
    return io;
}

