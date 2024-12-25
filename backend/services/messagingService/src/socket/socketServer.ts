import { Server  } from "socket.io";
import socketHandler from "./socketHandler";

let io: Server;

export const initSocketServer = (httpServer: any) => {

    console.log('initiialising socket server !!!!!');

    io = new Server(httpServer, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    const chatNameSpace =  io.of('/chat'); 

    socketHandler(chatNameSpace);

};
