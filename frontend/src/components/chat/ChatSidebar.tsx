
import { RootState } from "@/store/store";
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import {getChatRooms } from '@/api/chat'
import { IChatRoom } from '@/types/IChatRoom';


    // chat rooms listing 

// const messages = [
//     { name: "bahir", time: "6:28 PM", preview: "You: See you shortly" },
//     { name: "shahir", time: "4:11 PM", preview: "Ralph: Sent an image" },
//     { name: "pr", time: "Yesterday", preview: "You: I'm not sure" },
// ];
type chatSidebarProps = {
    onChangeChat: (chatId: string,senderId:string,receiverId:string) => void        
};

const ChatSidebar: React.FC<chatSidebarProps> = ({ onChangeChat }) => {
    const { userInfo } = useSelector((state: RootState) => state.user);

    const [chatRooms, setSetChatRooms] = useState<IChatRoom[]>([]);

    useEffect(() => {
        fetchChatRooms();
    }, []);

    const fetchChatRooms = async () => {
        try {
            const chatRooms = await getChatRooms(userInfo._id);

            console.log("chatRooms:", chatRooms);

            setSetChatRooms(chatRooms);
        } catch (error) {
            console.error("Error fetching chat rooms:", error);
        }
    };
    
    return (
        <div className="w-3/12 h-screen border-r bg-white">
            <div className="p-4 text-xl font-bold border-b">Messages</div>
            <input className="w-full p-2 border-b outline-none" placeholder="Search" />
            <ul>
                {chatRooms.map((chat: IChatRoom, idx) => (
                    <li key={idx} className="p-3 hover:bg-gray-100 cursor-pointer flex flex-col border-b" onClick={() => onChangeChat(chat._id!, chat.participants[0], chat.participants[1])}>
                        <span className="font-medium">{chat.participants[0].name || "puthiya message nd"} </span>
                        <span className="text-xs text-gray-500">{chat.participants.map((participant) => participant).join(", ")}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;
