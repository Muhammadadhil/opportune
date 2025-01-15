import { Namespace } from "socket.io";
import container from "../config/inversify";
import { IMessageService } from "../services/interfaces/IMessageService";
import { TYPES } from "../interfaces/types";

const messageService = container.get<IMessageService>(TYPES.IMessageService);

const socketHandler = (io:Namespace) => {

    const onlineUsers = new Set<string>();
    const userSocketMap = new Map<string, string>();

    try {
        io.on('connection', (socket) => {
                        
            socket.on('register',(data) => {
                const {userId} = data;

                userSocketMap.set(socket.id, userId);
                onlineUsers.add(userId);

                // Broadcast to others that this user is online
                socket.broadcast.emit('userOnline', userId);

                // Send current online users list to the newly connected user
                socket.emit('getOnlineUsers', Array.from(onlineUsers));
                
            })

            console.log('socket rooms:',socket.rooms);

            // join a chat room
            socket.on('joinRoom',(chatRoomId:string)=>{
                // console.log('User joined room: chatRoomId:', chatRoomId);
                socket.join(chatRoomId);
            });

            // send a message
            socket.on('sendMessage',async (message:any)=>{
                const newMessage = await messageService.sendMessage(message.sender, message.receiver, message.content, message.chatRoom);                
                socket.broadcast.to(message.chatRoom).emit("newMessage", message);
            });

            socket.on('disconnect', () => {
                // console.log('Client disconnected');
                const userId = userSocketMap.get(socket.id);
                if(userId){
                    onlineUsers.delete(userId);
                    userSocketMap.delete(socket.id);
                    socket.broadcast.emit('userOffline', userId);
                }
            });

        })
        
    } catch (error) {
        console.log('socketHandler error:',error);
    }
}

export default socketHandler;