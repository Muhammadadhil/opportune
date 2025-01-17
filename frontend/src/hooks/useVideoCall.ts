import { useContext } from "react";
import { VideoCallContext } from "@/contexts/videoCallContext";

export function useVideoCall(){
    const context = useContext(VideoCallContext);

    if(!context) throw new Error('useVideoCall must be used within a VideoCallProvider');

    return context;
} 