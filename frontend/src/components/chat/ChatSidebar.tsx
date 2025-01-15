import { RootState } from "@/store/store";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getChatRooms } from "@/api/chat";
import { Search, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IChatRoom } from "@/types/IChatRoom";
import { IUser } from "@/types/IUser";
import { getRelativeTime } from "@/utils/relativeDateFormatter";
import { getChatParticipants } from "@/utils/getChatUser";


interface ChatSidebarProps {
    onChangeChat: (chatId: string, sender: IUser, receiver: IUser) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onChangeChat }) => {

    const { userInfo } = useSelector((state: RootState) => state.user);
    const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    console.log("chatRomms:", chatRooms);

    useEffect(() => {
        if (userInfo?._id) {
            fetchChatRooms();
        }
    }, [userInfo?._id]);

    const fetchChatRooms = async () => {
        try {
            const chatRooms = await getChatRooms(userInfo?._id);
            setChatRooms(chatRooms);
        } catch (error) {
            console.error("Error fetching chat rooms:", error);
        }
    };

    const filteredChatRooms = chatRooms.filter((chat) => {
        const { otherUser } = getChatParticipants(chat,userInfo?._id);
        const searchTerm = searchQuery.toLowerCase();
        return otherUser.firstname?.toLowerCase().includes(searchTerm) || otherUser.lastname?.toLowerCase().includes(searchTerm) || otherUser.email?.toLowerCase().includes(searchTerm);
    });

    return (
        <div className="w-80 h-screen border-r flex flex-col">
            <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold">Messages</h1>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Edit className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
                        placeholder="Search messages"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {filteredChatRooms.map((chat) => {
                    const {otherUser} = getChatParticipants(chat,userInfo?._id);
                    return (
                        <div
                            key={chat._id}
                            className="p-4 hover:bg-gray-50 cursor-pointer flex items-start gap-3 border-b transition-colors"
                            onClick={() => onChangeChat(chat._id, userInfo, otherUser)}
                        >
                            <Avatar className="h-12 w-12">
                                <AvatarImage alt={`${otherUser.firstname} ${otherUser.lastname}`} />
                                <AvatarFallback>{otherUser.firstname?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold truncate">{otherUser.firstname && otherUser.lastname ? `${otherUser.firstname} ${otherUser.lastname}` : "New Message"}</h3>
                                    {/* {chat.lastMessageAt && <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{getRelativeTime(chat.lastMessageAt)}</span>} */}
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* {chat?.unreadCount > 0 && <Circle className="h-2 w-2 fill-blue-600 text-blue-600" />} */}
                                </div>
                                <p className="text-xs text-gray-500 truncate">{otherUser.email}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatSidebar;
