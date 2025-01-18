import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import VideoCallOverlay from '@/components/chat/VideoCallOverlay';

const VideoCallWrapper: React.FC = () => {

    const [searchParams] = useSearchParams();
    const roomId=searchParams.get("roomId");

    const { userInfo } = useSelector((state: RootState) => state.user);        
    const userId = userInfo?._id; 
    const username = userInfo?.firstname+" "+userInfo?.lastname; 

    const handleCallEnd = useCallback(() => {
    
            setTimeout(() => {
                const container = document.querySelector("#video-container");
                if (container) {
                    container.innerHTML = "";
                }
            }, 100);
        }, []);


    return <VideoCallOverlay roomId={roomId!} userId={userId!} userName={username} onCallEnd={handleCallEnd} />;
};

export default VideoCallWrapper;