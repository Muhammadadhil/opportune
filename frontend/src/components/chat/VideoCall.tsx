import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useVideoCallSocket } from "@/hooks/socket/useVideoCallSocket";

interface VideoCallProps {
    roomId: string;
    userId: string;
    userName: string;
    onCallEnd?: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId, userId, userName, onCallEnd }) => {

    const zegoRef = useRef<any>(null);

    // const { socket } = useVideoCallSocket();

    useEffect(() => {

        const initCall = async () => {
            try {

                const appID = parseInt(import.meta.env.VITE_APPID);
                const serverSecret = import.meta.env.VITE_SERVER_SECRET;

                if (!appID || !serverSecret) {
                    throw new Error("AppID or ServerSecret is missing");
                }

                const tokenExpiryTime = 3600;
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId.toString(), userId.toString(), userName, tokenExpiryTime);
                // console.log("kitToken:", kitToken);

                // create zego instance
                zegoRef.current = ZegoUIKitPrebuilt.create(kitToken);
                // const zc = ZegoUIKitPrebuilt.create(kitToken);

                console.log("zego instance:", zegoRef.current);

                zegoRef.current.joinRoom({
                    container: document.querySelector("#video-container")!,
                    // sharedLinks: [
                    //     {
                    //         name: "Copy Link",
                    //         // url: window.location.origin+"?roomId="+roomId,
                    //         url: `${window.location.origin}/video-chat?roomId=${roomId}`
                    //     },
                    // ],
                    scenario: {
                        mode: ZegoUIKitPrebuilt.OneONoneCall,
                    },
                    showScreenSharingButton: true,
                    onLeaveRoom: onCallEnd,
                    onerror: (error: any) => {
                        console.error("ZEGO Error:", error);
                        onCallEnd?.();
                    },
                });

                // socket logic to send call to the other user

                // socket.emit('call', {
                //     roomId,
                //     userId,
                //     userName,
                // });

            } catch (error) {
                console.error("Failed to initialize video call:", error);
                onCallEnd?.();
            }
        };

        initCall();

        return () => {
            console.log('Cleaning up video call...');
            
            if (zegoRef.current) {
                try {
                    // Destroy the instance (this internally handles leaving the room)
                    zegoRef.current.destroy();
                    
                    // Clear the container
                    const container = document.querySelector("#video-container");
                    if (container) {
                        while (container.firstChild) {
                            container.removeChild(container.firstChild);
                        }
                    }
                    
                    // Release camera and microphone
                    if (navigator.mediaDevices) {
                        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                            .then(stream => {
                                stream.getTracks().forEach(track => track.stop());
                            })
                            .catch(err => console.error("Error releasing media devices:", err));
                    }

                    zegoRef.current = null;
                } catch (error) {
                    console.error("Error cleaning up video call:", error);
                }
            }
        };
    }, [roomId, userId, userName, onCallEnd]);

    return <div id="video-container" className="w-full h-screen" style={{ width: "100vw", height: "100vh" }} />;
};

export default VideoCall;
