import { useState, useEffect, createContext, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";


import { RootState } from "@/store/store";
import { useVideoCallSocket } from '@/hooks/socket/useVideoCallSocket'
 

interface VideoCallContextType {
    isIncomingCall: boolean;
    incomingCallData: any;
    acceptCall: (roomId:string,calledId:string) => void;
    rejectCall: (roomId:string,calledId:string) => void;

    initiateCall: (roomId: string, userId: string, userName: string, receiverId: string, receiverName: string) => void;
}


const VideoCallContext = createContext<VideoCallContextType | null>(null);


export const VideoCallProvider = ({children}: {children: React.ReactNode})=> {

    const [isIncomingCall, setIsIncomingCall] = useState(false);
    const [incomingCallData, setIncomingCallData] = useState<any>(null);

    const { toast } = useToast();

    const { userInfo } = useSelector((state: RootState) => state.user);

    const { socket, acceptCall, rejectCall, initiateCall } = useVideoCallSocket();



    useEffect(()=>{

        if(!socket) return;

        socket.on('incoming-call', (callData: any)=> {
            setIsIncomingCall(true);
            setIncomingCallData(callData);

            toast({
                title: 'Incoming Video Call',
                description: `${callData.caller.userName} is calling you`,
                variant: 'default',
                duration: 30000,
                action: (
                    <div className="flex gap-2">
                        <Button
                            onClick={() => handleAcceptCall(callData.roomId)}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                            Accept
                        </Button>
                        <button
                            onClick={() => handleRejectCall(callData.roomId)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Reject
                        </button>
                    </div>
                )
            });

        })

        return () => {
            socket.off('incoming-call');
        }
        
    },[socket]);



    const handleAcceptCall = (roomId: string) => {
        acceptCall(roomId);
        setIsIncomingCall(false);
        setIncomingCallData(null);
    }

    const handleRejectCall = (roomId: string) => {
        rejectCall(roomId, incomingCallData.caller.userId);
        setIsIncomingCall(false);
        setIncomingCallData(null);
    }


    const value = {
        isIncomingCall,
        incomingCallData,
        acceptCall: handleAcceptCall,
        rejectCall: handleRejectCall,
        initiateCall,
    }

    return (

        <VideoCallContext.Provider value={value}>
            {children}
        </VideoCallContext.Provider>
    )

}

export function useVideoCall(){
    const context = useContext(VideoCallContext);

    if(!context) throw new Error('useVideoCall must be used within a VideoCallProvider');

    return context;
}
