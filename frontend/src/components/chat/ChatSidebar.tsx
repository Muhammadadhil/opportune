import { RootState } from "@/store/store";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getChatRooms } from "@/api/chat";
import { Search, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IChatRoom } from "@/types/IChatRoom";
import { IUser } from "@/types/IUser";
import { getChatParticipants } from "@/utils/getChatUser";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";


interface ChatSidebarProps {
    onChangeChat: (chatId: string, sender: IUser, receiver: IUser) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onChangeChat }) => {

    const { userInfo } = useSelector((state: RootState) => state.user);
    const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    console.log("chatRomms:", chatRooms);

    useEffect(() => {
        if (userInfo?._id) {
            fetchChatRooms();
        }
    }, [userInfo?._id]);

    const fetchChatRooms = async () => {
        try {
            const chatRooms = await getChatRooms(userInfo?._id ?? '');
            setChatRooms(chatRooms);
        } catch (error) {
            console.error("Error fetching chat rooms:", error);
        }
    };

    const filteredChatRooms = chatRooms.filter((chat) => {
        const { otherUser } = getChatParticipants(chat,userInfo?._id ?? '');
        const searchTerm = searchQuery.toLowerCase();
        return otherUser.firstname?.toLowerCase().includes(searchTerm) || otherUser.lastname?.toLowerCase().includes(searchTerm) || otherUser.email?.toLowerCase().includes(searchTerm);
    });

    return (
        <div className="w-full md:w-80 h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Messages</h2>
            </div>
            
            <div className="p-4">
                <Input 
                    placeholder="Search conversations..." 
                    className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
            </div>

            <div className="overflow-y-auto h-[calc(100vh-8rem)]">
                {filteredChatRooms.map((chat) => {
                    const {otherUser} = getChatParticipants(chat,userInfo?._id);
                    return (
                        <div
                            key={chat._id}
                            className={cn(
                                "p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200",
                                selectedChatId === chat._id && "bg-gray-100 dark:bg-gray-900"
                            )}
                            onClick={() => {
                                setSelectedChatId(chat._id);
                                onChangeChat(chat._id, userInfo, otherUser);
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={chat.avatar} />
                                    <AvatarFallback className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        {chat?.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {chat?.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {chat.lastMessage}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {chat.timestamp}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatSidebar;
