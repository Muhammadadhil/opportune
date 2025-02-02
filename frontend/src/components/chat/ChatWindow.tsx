import { useEffect, useRef, useState } from "react";
import React from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useLocation } from "react-router-dom";
import { useChatSocket } from "@/hooks/socket/useChatSocket";
import { IMessage, messageType } from "@/types/IMessage";
import useMessages from "@/hooks/chat/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { Video } from "lucide-react";
import { ChatState } from "@/types/IChat";
import { newMessage } from "@/types/IMessage";
import VideoCallOverlay from "./VideoCallOverlay";
import { ScrollArea } from "../ui/scroll-area";
import { useVideoCall } from '@/contexts/videoCallContext';
import { useToast } from "@/hooks/use-toast";
import CallingOverlay from "@/components/chat/CallingOverLay";
import { useNavigate } from "react-router-dom";

const ChatWindow: React.FC = () => {
    
    const { socket, onlineUsers } = useChatSocket();
    const location = useLocation();
    const queryClient = useQueryClient();
    const state = location.state as ChatState;

    const { initiateCall , socket: videoCallSocket } = useVideoCall();
    const { toast } = useToast();

    const [isInCall, setIsInCall] = useState(false);
    const [isCalling, setIsCalling] = useState(false);

    const navigate = useNavigate();

    const videoCallIdRef = useRef(`${Math.random().toString(36).substr(2, 9)}-${Date.now()}`);

    console.log('videoCallIdRef', videoCallIdRef.current);

    const handleVideoCall = () => {
        setIsCalling(true);
        initiateCall(
            `${chatRoomId}${videoCallIdRef.current}`,
            sender._id,
            `${sender.firstname} ${sender.lastname}`,
            receiver._id,
            `${receiver.firstname} ${receiver.lastname}`
        );
    };

    const handleCallEnd = () => {

        console.log('!!!!!!!!!!!!!! handleCallEnd !!!!!!!!!!!!!!!!!');

        setIsInCall(false);
        const container = document.querySelector("#video-container");
        if (container) {
            container.innerHTML = "";
        }
        navigate(-1);
    };

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

            console.log('#################### Received newMessage event 00000', message);

            
            if (!chatRoomId) return;
            message.type = message.messageType || 'saambarrrr';
            
            console.log('#################### Received newMessage event 1111111111111', message);
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
                // Find the actual scrollable viewport within the ScrollArea component
                const scrollViewport = messagesContainerRef.current.querySelector('[data-radix-scroll-area-viewport]');
                if (scrollViewport) {
                    scrollViewport.scrollTop = scrollViewport.scrollHeight;
                }
            }
        };
        setTimeout(scrollToBottom, 0);
    }, [messages]);

    

    useEffect(() => {
        if (!videoCallSocket) return;

        videoCallSocket.on('call-accepted', () => {
            toast({
                title: "User Accepted Call , Joining the meeting",
                description: "Call accepted",
                duration: 5000,
            });
            setIsCalling(false);
            setIsInCall(true);
            
        });

        videoCallSocket.on('call-rejected', () => {
            setIsCalling(false);
            toast({
                title: "Call Rejected",
                description: "The caller has rejected the call",
                variant: "destructive",
                duration: 4000,
            });
        });

        videoCallSocket.on('video-call-failed', (data: { reason: string }) => {
            setIsCalling(false);
            toast({
                title: "Call Failed",
                description: data.reason,
                variant: "destructive"
            });
        });

        return () => {
            videoCallSocket.off('call-accepted');
            videoCallSocket.off('video-call-failed');
            videoCallSocket.off('call-rejected');
        };
    }, [videoCallSocket]);

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
            type: messageType.text
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

        console.log('new message comess grouping itt !!')
        
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
        <div className="flex-1 flex flex-col h-[calc(100vh-8rem)] bg-white dark:bg-zinc-900 rounded-xl">
            {/* Chat header */}
            <div className="flex-none items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">{receiver.firstname?.[0] || receiver._id.charAt(0)}</div>
                            <div className={`absolute bottom-0 right-0 w-3 h-3 ${isUserOnline ? 'bg-green-500' : 'bg-gray-500'} rounded-full border-2 border-white`}></div>
                        </div>
                        <div>
                            <h2 className="font-semibold">{receiver.firstname ? `${receiver.firstname} ${receiver.lastname || ""}` : receiver._id}</h2>
                            <span className="text-sm text-gray-500">{`${isUserOnline ? 'online' : 'offline'}`}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="chat-interface">

                            <button onClick={handleVideoCall} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-500 rounded-full transition-colors ">
                                <Video className="w-5 h-5 text-gray-600 dark:text-white" />
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
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                ) : (
                    Object.entries(messageGroups).map(([date, groupMessages]) => (
                        <div key={date} className="space-y-3">
                            <div className="flex justify-center">
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-500 dark:bg-zinc-800 dark:text-white">{date}</span>
                            </div>

                            {groupMessages.map((msg, idx) => (
                                <MessageBubble key={idx} sender={msg.sender} message={msg.content} timestamp={msg.createdAt} isSender={msg.sender === senderId} type={msg.type} />
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

            {/* Show calling overlay for the caller */}
            {isCalling && (
                <CallingOverlay 
                    calleeName={`${receiver.firstname} ${receiver.lastname}`}
                    onCancel={() => {
                        setIsCalling(false);
                        videoCallSocket?.emit('cancel-call', {
                            roomId: `${chatRoomId}${videoCallIdRef.current}`,
                            receiverId: receiver._id
                        });
                    }}
                    onJoin={() => {
                        setIsCalling(false);
                        setIsInCall(true);
                    }}
                />
            )}

            {/* Show video call when call is active */}
            {isInCall && (
                <VideoCallOverlay 
                    roomId={`${chatRoomId}${videoCallIdRef.current}`}
                    userId={sender._id}
                    userName={`${sender.firstname} ${sender.lastname}`}
                    onCallEnd={() => {
                        handleCallEnd();
                    }}
                />
            )}
        </div>
    );
};

export default ChatWindow;
