import { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import createSocketConnection from "@/utils/socketConnection";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const SOCKET_URL = import.meta.env.VITE_NODE_ENV == "production" ? `wss://${import.meta.env.VITE_VIDEOCALL_SOCKET_URL}` : `ws://${import.meta.env.VITE_VIDEOCALL_SOCKET_URL}`;

export const useVideoCallSocket = () => {

    const [socket, setSocket] = useState<Socket | null>(null);
    const { userInfo } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!userInfo?._id) return;

        const newSocket = createSocketConnection(SOCKET_URL, "/messaging-socket/videoCall");
        setSocket(newSocket);

        // Register user for video calls when socket connects
        newSocket.emit("register-video", {
            userId: userInfo._id,
            userName: `${userInfo.firstname} ${userInfo.lastname}`
        });


        const handleCallRejected = (data: { roomId: string }) => {
            // Handle when call is rejected
            console.log('Call rejected for room:', data.roomId);
        };

        const handleCallEnded = (data: { roomId: string }) => {
            // Handle when call is ended
            console.log('Call ended for room:', data.roomId);
        };

        // newSocket.on("incoming-call", handleIncomingCall);
        // newSocket.on('call-accepted', handleCallAccepted);
        newSocket.on('call-rejected', handleCallRejected);
        newSocket.on('callEnded', handleCallEnded);

        return () => {
            // newSocket.off('incomingCall', handleIncomingCall);
            // newSocket.off('call-accepted', handleCallAccepted);
            newSocket.off('callRejected', handleCallRejected);
            newSocket.off('callEnded', handleCallEnded);
            newSocket.disconnect();
        };
    }, [userInfo]);

    const initiateCall = (roomId: string, userId: string, userName: string, receiverId: string, receiverName: string) => {
        if (!socket || !userInfo) return;
                
        socket.emit("initiateCall", {
            roomId,
            caller: { userId, userName },
            receiver: { userId: receiverId, userName: receiverName },
        });
    };

    const acceptCall = (roomId: string) => {
        if (!socket || !userInfo) return;

        socket.emit('accept-call', {
            roomId
        });
    };

    const rejectCall = (roomId: string, callerId: string) => {
        if (!socket || !userInfo) return;

        socket.emit('reject-call', {
            roomId,
            callerId,
            receiverId: userInfo._id
        });
    };

    const endCall = (roomId: string) => {
        if (!socket || !userInfo) return;

        socket.emit('endCall', {
            roomId,
            userId: userInfo._id
        });
    };

    return {
        socket,
        initiateCall,
        acceptCall,
        rejectCall,
        endCall
    };
};
