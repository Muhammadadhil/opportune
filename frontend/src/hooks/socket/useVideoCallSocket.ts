import { Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import createSocketConnection from "@/utils/socketConnection";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const SOCKET_URL = import.meta.env.VITE_VIDEOCALL_SOCKET_URL;

export const useVideoCallSocket = () => {

    const [socket, setSocket] = useState<Socket | null>(null);
    const { userInfo } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!userInfo?._id) return;

        const newSocket = createSocketConnection(SOCKET_URL);
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!! creating socket connection 11',newSocket)
        setSocket(newSocket);


        // Register user for video calls when socket connects
        newSocket.emit("register-video", {
            userId: userInfo._id,
            userName: `${userInfo.firstname} ${userInfo.lastname}`
        });

        // const handleIncomingCall = (callData: {
        //     roomId: string;
        //     callerId: string;
        //     callerName: string;
        // }) => {

        //     console.log('incoming-call comingggg ')


        //     // socket?.emit('callReceived', {
        //     //     roomId: callData.roomId,
        //     //     receiverId: userInfo._id
        //     // });
        // };

        const handleCallAccepted = (data: { roomId: string }) => {
            // Handle when call is accepted
            console.log('Call accepted for room:', data.roomId);

            // join in zego room
        };

        const handleCallRejected = (data: { roomId: string }) => {
            // Handle when call is rejected
            console.log('Call rejected for room:', data.roomId);
        };

        const handleCallEnded = (data: { roomId: string }) => {
            // Handle when call is ended
            console.log('Call ended for room:', data.roomId);
        };

        // newSocket.on("incoming-call", handleIncomingCall);
        newSocket.on('call-accepted', handleCallAccepted);
        newSocket.on('callRejected', handleCallRejected);
        newSocket.on('callEnded', handleCallEnded);

        return () => {
            // newSocket.off('incomingCall', handleIncomingCall);
            newSocket.off('callAccepted', handleCallAccepted);
            newSocket.off('callRejected', handleCallRejected);
            newSocket.off('callEnded', handleCallEnded);
            newSocket.disconnect();
        };
    }, [userInfo]);

    const initiateCall = (roomId: string, userId: string, userName: string, receiverId: string, receiverName: string) => {
        if (!socket || !userInfo) return;
        

        console.log('initiating call 11!! ', roomId, userId, userName, receiverId, receiverName);
        socket.emit("initiateCall", {
            roomId,
            caller: { userId, userName },
            receiver: { userId: receiverId, userName: receiverName },
        });
    };

    const acceptCall = (roomId: string) => {
        console.log('accepting call 11!!');

        if (!socket || !userInfo) return;

        console.log('accepting call 22!!');

        socket.emit('accept-call', {
            roomId
        });
    };

    const rejectCall = (roomId: string, callerId: string) => {
        if (!socket || !userInfo) return;

        socket.emit('rejectCall', {
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
