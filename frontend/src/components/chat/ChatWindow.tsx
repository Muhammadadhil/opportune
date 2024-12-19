// components/ChatWindow.tsx
import { useEffect, useState } from "react";
import React from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { io } from "socket.io-client";
import createSocketConnection from "@/utils/socketConnection";


// const socket = io("http://localhost:3060/", {
//     reconnection: true,
//     reconnectionAttempts: 5,
//     reconnectionDelay: 1000,
// });

type chatwindowprops = {
    chatRoomId: string;
    senderId:string;
    receiverId:string
};

export enum messageStatus {
    sent = "sent",
    delivered = "delivered",
    read = "read",
}

export enum messageType {
    text = "text",
    image = "image",
    file = "file",
}


export interface IMessage {
    sender: string;
    receiver: string;
    content: string;
    chatRoom: string;
    type?: messageType;
    status?: messageStatus;
    attachmentUrl?: string | null;
}

const chatsocketUrl = import.meta.env.VITE_CHAT_SOCKET_URL;

const ChatWindow: React.FC<chatwindowprops> = ({chatRoomId,senderId,receiverId}) => {

   console.log('chatRoomId for chat window:',chatRoomId);

   const [messages, setMessages] = useState<IMessage[]>([]);
   const socket = createSocketConnection(chatsocketUrl);

    useEffect(() => {

        // join the room
        socket.emit("joinRoom", chatRoomId);

        // listen for new messages  

        return () => {
            socket.off("newMessage");
        };

    }, []);

    useEffect(()=>{
        socket.on("newMessage", (message) => {
            console.log("new Mssage arrived:", message);

            setMessages((prevMessages) => [...prevMessages, message]);
        });
   
    })

    const sendMessage = (content: string) => {
        
        console.log("sending message:",content);

        const message: IMessage = {
            sender: senderId,
            receiver: receiverId,
            content,
            chatRoom: chatRoomId,
        };

        setMessages((prevMessages) => [...prevMessages, message]);

        socket.emit("sendMessage", message);
    }


    return (
        <div className="w-8/12 max-h-[860px] flex flex-col bg-gray-50">
            <div className="p-4 border-b bg-white">
                <h1 className="font-bold text-lg">reciver :  {receiverId}</h1>
                <span className="text-sm text-gray-500">freelancer</span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} sender={msg.sender} message={msg.content} />
                ))}
            </div>

            {/* Input */}
            <ChatInput onSend={sendMessage} />
        </div>
    );
};

export default ChatWindow;
