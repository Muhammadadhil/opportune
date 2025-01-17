import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useLocation } from "react-router-dom";
import { useChatSocket } from "@/hooks/socket/useChatSocket";
import { IMessage } from "@/types/IMessage";
import useMessages from "@/hooks/chat/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { Video } from "lucide-react";
import { ChatState } from "@/types/IChat";
import { newMessage } from "@/types/IMessage";
import VideoCallOverlay from "./VideoCallOverlay";
import { ScrollArea } from "../ui/scroll-area";

const ChatWindow: React.FC = () => {
    
    const {socket,onlineUsers} = useChatSocket();
    const location = useLocation();
    const queryClient = useQueryClient();
    const state = location.state as ChatState;

    const [isInCall, setIsInCall] = useState(false);

    const handleCallEnd = useCallback(() => {

        setIsInCall(false);
        setTimeout(() => {
            const container = document.querySelector("#video-container");
            if (container) {
                container.innerHTML = "";
            }
        }, 100);
    }, []);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const chatRoomId = state?.chatRoomId;

    const { data: messages = [], isLoading, error } = useMessages(chatRoomId || "");

    useEffect(() => {

        if (!socket || !chatRoomId) return;

        socket.emit("joinRoom", chatRoomId);

        return () => {
            socket.off("joinRoom");
        };
        
    }, [chatRoomId, socket]);


    useEffect(() => {

        if (!socket) return;

        socket.on("newMessage", (message) => {
            if (!chatRoomId) return;
            queryClient.setQueryData(["messages", chatRoomId], (oldData: IMessage[] = []) => {
                return [...oldData, message];
            });
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket, chatRoomId, queryClient]);

    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesContainerRef.current) {
                const { scrollHeight, clientHeight } = messagesContainerRef.current;
                messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
            }
        };

        scrollToBottom();
    }, [messages]);

    if (!state) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">No chat selected</p>
            </div>
        );
    }

    const { sender, receiver } = state;
    const senderId = sender._id;
    const receiverId = receiver._id;

    const sendMessage = (content: string) => {
        if (!socket || !chatRoomId) return;

        const message: newMessage = {
            sender: senderId,
            receiver: receiverId,
            content,
            chatRoom: chatRoomId,
            createdAt: new Date(),
        };

        queryClient.setQueryData(["messages", chatRoomId], (oldData: IMessage[] = []) => {
            return [...oldData, message];
        });

        socket.emit("sendMessage", message);
    };

    if (error) {
        return (
            <div className="w-full flex justify-center items-center h-full">
                <div className="text-red-500">Error loading messages. Please try again later.</div>
            </div>
        );
    }

    const formatMessageDate = (date: string | Date) => {
        const messageDate = new Date(date);
        const today = new Date();

        if (messageDate.toDateString() === today.toDateString()) {
            return "Today";
        }

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (messageDate.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        }

        return messageDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const groupMessagesByDate = (messages: IMessage[]) => {
        const groups: { [key: string]: IMessage[] } = {};

        messages.forEach((message) => {
            const date = formatMessageDate(message.createdAt);
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });

        return groups;
    };

    const messageGroups = groupMessagesByDate(messages);

    console.log('online users:',onlineUsers);
    const isUserOnline = onlineUsers.includes(receiver._id);

    return (
        <div className="flex-1 flex flex-col h-[calc(100vh-8rem)] bg-white">
            {/* Chat header */}
            <div className="flex-none items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">{receiver.firstname?.[0] || receiver._id.charAt(0)}</div>
                            <div className={`absolute bottom-0 right-0 w-3 h-3 ${isUserOnline ? 'bg-green-500' : 'bg-gray-500'} rounded-full border-2 border-white`}></div>
                        </div>
                        <div>
                            <h2 className="font-semibold">{receiver.firstname ? `${receiver.firstname} ${receiver.lastname || ""}` : receiver._id}</h2>
                            <span className="text-sm text-gray-500">{`${isUserOnline ? 'online' : 'offline'}`}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="chat-interface">
                            <button onClick={() => setIsInCall(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors ">
                                <Video className="w-5 h-5 text-gray-600 " />
                            </button>
                        </div>
                    </div>

                    {/* <div className="flex items-center gap-2">
                        <button onClick={() => setIsInCall(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Video className="w-5 h-5 text-gray-600" />
                        </button>
                    </div> */}
                </div>
            </div>

            {/* Messages area with containerRef */}
            <ScrollArea ref={messagesContainerRef} className="flex-1 px-4 py-6">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    Object.entries(messageGroups).map(([date, groupMessages]) => (
                        <div key={date} className="space-y-3">
                            <div className="flex justify-center">
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-500">{date}</span>
                            </div>
                            {groupMessages.map((msg, idx) => (
                                <MessageBubble key={idx} sender={msg.sender} message={msg.content} timestamp={msg.createdAt} isSender={msg.sender === senderId} />
                            ))}
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Chat input */}
            <div className="flex-none">
                <ChatInput onSend={sendMessage} />
            </div>

            {/* video call  */}
            {isInCall && (
                <VideoCallOverlay roomId={`${chatRoomId}${Date.now()}`} userId={sender._id} userName={`${sender.firstname} ${sender.lastname}`} onCallEnd={handleCallEnd} />
            )}
        </div>
    );
};

export default ChatWindow;
