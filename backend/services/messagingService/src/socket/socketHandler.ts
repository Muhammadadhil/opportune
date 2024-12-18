import { Namespace } from "socket.io";

const socketHandler = (io:Namespace) => {
    try {

        io.on('connection', (socket) => {
             
            console.log('socket:',socket);
            console.log('New User connected:', socket.id);


            // join a chat room
            socket.on('joinRoom',(chatRoomId:string)=>{
                socket.join(chatRoomId);
                console.log('User joined room:', chatRoomId);
            });


            // send a message
            socket.on('sendMessage',(message:any)=>{

                // create a message in database

                io.to(message.chatRoomId).emit('sendMessage',message);
            });



            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });




        })
        
    } catch (error) {
        
    }
}

export default socketHandler;