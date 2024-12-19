import { Server  } from "socket.io";
import socketHandler from "./socketHandler";

let io: Server;

export const initSocketServer = (httpServer: any) => {

    console.log('initiialising socket server !!!!!');

    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    // io.on('connection', (socket) => {     

    //     console.log('New User connected for chat:', socket.id);
    // });
    
    const chatNameSpace =  io.of('/chat'); 

    socketHandler(chatNameSpace);

};
