import { Namespace } from "socket.io";
import container from "../config/inversify";
import { IMessageService } from "../services/interfaces/IMessageService";
import { TYPES } from "../interfaces/types";

const messageService = container.get<IMessageService>(TYPES.IMessageService);

const socketHandler = (io:Namespace) => {
    try {

        io.on('connection', (socket) => {
            // console.log('New User connected for chat :', socket.id);
            
            // join a chat room
            socket.on('joinRoom',(chatRoomId:string)=>{
                console.log('User joined room: chatRoomId:', chatRoomId);
                socket.join(chatRoomId);
            });

            // send a message
            socket.on('sendMessage',async (message:any)=>{

                const newMessage = await messageService.sendMessage(message.sender, message.receiver, message.content, message.chatRoom);
                console.log('newMessage saved in db:',newMessage);
                
                socket.broadcast.to(message.chatRoom).emit("newMessage", message);
                console.log("!! msg sent to all users in chatRoom !!");
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });

        })
        
    } catch (error) {
        console.log('socketHandler error:',error);
    }
}

export default socketHandler;