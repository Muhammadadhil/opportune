import React from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import MaxWidth from "@/layouts/MaxWidth";
import { useNavigate } from "react-router-dom";
import { IUser } from "@/types/IUser";
import { ChatState } from "@/types/IChat";


const ChatPage: React.FC = () => {
    const navigate = useNavigate();

    const handleChangeChatWindow = (chatRoomId: string, sender: IUser, receiver: IUser) => {
        navigate("/chat", {
            state: {
                chatRoomId,
                sender,
                receiver,
            } as ChatState,
        });
    };

    return (
        <div className="h-screen overflow-hidden">
            <MaxWidth>
                <div className="h-screen pt-6 pb-6">
                    <div className="flex h-[calc(100vh-3rem)] w-full max-w-[1400px] mx-auto bg-white rounded-lg shadow-lg">
                        <ChatSidebar onChangeChat={handleChangeChatWindow} />
                        <ChatWindow />
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
};

export default ChatPage;
