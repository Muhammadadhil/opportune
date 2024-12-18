import { Server as WebSocketServer } from "socket.io";
import socketHandler from "./socketHandler";

let io: WebSocketServer;

export const initSocketServer = (httpServer: any) => {

    io = new WebSocketServer(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    
    const chatNameSpace =  io.of('/chat');  //

    socketHandler(chatNameSpace);

};
