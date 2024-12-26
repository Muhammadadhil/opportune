// VideoCall.tsx
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect } from "react";

interface VideoCallProps {
    roomId: string;
    userId: string;
    userName: string;
    onCallEnd?: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId, userId, userName, onCallEnd }) => {


    console.log('on video call component !!!!!!!!!!!!!!!!!!!!!!!!!!');

    useEffect(() => {

        const initCall = async () => {
            // const appID = import.meta.env.VITE_APPID;                 // Get from ZEGOCLOUD Console
            // const serverSecret = import.meta.env.VITE_SERVER_SECRET;  // Get from ZEGOCLOUD Console

             const appID = 1991079114; // Must be number, not string
             const serverSecret = "af72ceaee3a096be44a520fa3c73c832";

            console.log("appId:", appID);
            console.log('serverSEceter:',serverSecret);

            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, userId, userName);

            const zc = ZegoUIKitPrebuilt.create(kitToken);

            zc.joinRoom({
                container: document.querySelector("#video-container")!,
                sharedLinks: [
                    {
                        name: "Copy Link",
                        url: window.location.href,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: true,
                onLeaveRoom: onCallEnd,
            });
        };

        initCall();
    }, [roomId, userId, userName, onCallEnd]);

    return <div id="video-container" className="w-full h-screen" style={{ width: "100vw", height: "100vh" }} />;
};

export default VideoCall;
