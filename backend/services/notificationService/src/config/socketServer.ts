
import { Server } from "socket.io";

let io: Server;

export const initSocketServer = (httpServer:any)=> {

    io = new Server(httpServer,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    })

    io.on('connection', (socket) => {

        // console.log('New client connected:', socket.id);

        socket.on('register',(userId) => {
            socket.join(userId);
            // console.log(`User ${userId} registered `);
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

