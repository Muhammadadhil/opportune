import { useState, useEffect, createContext, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button1";
import { Toaster } from "@/components/ui/toaster";
import { useVideoCallSocket } from '@/hooks/socket/useVideoCallSocket'
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
 

interface VideoCallContextType {
    isIncomingCall: boolean;
    incomingCallData: any;
    acceptCall: (roomId:string,calledId:string) => void;
    rejectCall: (roomId:string,calledId:string) => void;
    initiateCall: (roomId: string, userId: string, userName: string, receiverId: string, receiverName: string) => void;
    socket: Socket | null;
}

const VideoCallContext = createContext<VideoCallContextType | null>(null);

export const VideoCallProvider = ({children}: {children: React.ReactNode})=> {

    const [isIncomingCall, setIsIncomingCall] = useState(false);
    const [incomingCallData, setIncomingCallData] = useState<any>(null);

    const { toast,dismiss } = useToast();

    const { socket, acceptCall, rejectCall, initiateCall } = useVideoCallSocket();

    useEffect(()=>{

        if(!socket) return;

        socket.on('incoming-call', (callData: any)=> {

            // console.log("incoming-call incoming-callincoming-callincoming-callincoming-callincoming-callincoming-call", callData);

            setIsIncomingCall(true);
            setIncomingCallData(callData);

            console.log('!!!!!!! incoming-call in videoCallContext.tsx !!!!!!!');
            console.log('incoming call data:', callData);


            toast({
                title: 'Incoming Video Call',
                description: `${callData.caller.userName} is calling you`,
                variant: 'default',
                duration: 20000,
                action: (
                    <div className="flex gap-2">
                        <Button
                            onClick={() => handleAcceptCall(callData.roomId)}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                            Accept
                        </Button>
                        <button
                            onClick={() => handleRejectCall(callData.roomId, callData.caller.userId)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Reject
                        </button>
                    </div>
                )
            });

        })

        socket.on('call-cancelled', () => {
            setIsIncomingCall(false);
            setIncomingCallData(null);
            dismiss();

        });

        socket.on('call-rejected', () => {
            setIsIncomingCall(false);
            setIncomingCallData(null);
        });

        return () => {
            socket.off('incoming-call');
            socket.off('call-cancelled');
            socket.off('call-rejected');
        }
        
    },[socket]);


    const navigate = useNavigate();
    
    const handleAcceptCall = (roomId: string) => {
        navigate(`/video-chat?roomId=${roomId}`);
        acceptCall(roomId);
        setIsIncomingCall(false);
        setIncomingCallData(null);
        dismiss();

    }

    const handleRejectCall = (roomId: string, callerId: string) => {

        rejectCall(roomId, callerId);
        setIsIncomingCall(false);
        setIncomingCallData(null);
        dismiss();

    }

    const value = {
        isIncomingCall,
        incomingCallData,
        acceptCall: handleAcceptCall,
        rejectCall: handleRejectCall,
        initiateCall,
        socket
    }

    return (
        <>
            <Toaster />
            <VideoCallContext.Provider value={value}>
                {children}
            </VideoCallContext.Provider>
        </>
        
    )

}

export function useVideoCall(){

    const context = useContext(VideoCallContext);
    if(!context) throw new Error('useVideoCall must be used within a VideoCallProvider');

    return context;
}
