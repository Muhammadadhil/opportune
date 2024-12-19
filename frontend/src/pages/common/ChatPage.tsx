import {useState} from 'react';
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from '@/components/chat/ChatWindow'
import { FreelancerDetails } from "@/components/common/FreelancerDetailsCard";
import { useEffect } from "react";
import MaxWidth from "@/layouts/MaxWidth";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ChatPage: React.FC = () => {

    const location = useLocation();

    const [chatDetails, setChatDetails]=useState({
        chatRoomId: '',
        senderId: '',
        receiverId: ''
    })

    console.log('location:',location);

    const searchParams = new URLSearchParams(location.search);
    const chatRoomId = searchParams.get("chatRoomId");
    const senderId = searchParams.get("senderId");
    const receiverId = searchParams.get("receiverId");

    useEffect(() => {

        if (chatRoomId && senderId && receiverId) {
            setChatDetails({
                chatRoomId: chatRoomId,
                senderId: senderId,
                receiverId: receiverId
            })
        }
    }, [chatRoomId, senderId, receiverId]);

    // const params = useParams();
    // const chatRoomId = params.chatRoomId

    // console.log('params for chat page:',params);


    const handleChangeChatWindow = (chatRoomId: string, senderId: string, receiverId: string) => {

        console.log("!!! changingChat !!!!");

        setChatDetails({
            chatRoomId,
            senderId,
            receiverId,
        });
    };

    return (
        <MaxWidth>
            <div className="flex h-screen ">
                <ChatSidebar onChangeChat={handleChangeChatWindow} />
                <ChatWindow chatRoomId={chatDetails.chatRoomId!} senderId={chatDetails.senderId!} receiverId={chatDetails.receiverId!} />
                <div className="w-3/12 p-4">
                    <FreelancerDetails name="John Doe" imageUrl="/path-to-image.jpg" description="Experienced web developer specializing in React and Node.js with 5 years of industry experience." />
                </div>
            </div>
        </MaxWidth>
    );
};

export default ChatPage;
