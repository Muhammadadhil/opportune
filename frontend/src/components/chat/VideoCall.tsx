import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface VideoCallProps {
    roomId: string;
    userId: string;
    userName: string;
    onCallEnd?: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId, userId, userName, onCallEnd }) => {

    // console.log('on video call component !!!!!!!!!!!!!!!!!!!!!!!!!!');

    // navigator.mediaDevices
    //     .getUserMedia({ video: true, audio: true })
    //     .then((stream) => {
    //         // Start your video call here
    //         console.log('chataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaat vidoeoo');
    //     })
    //     .catch((error) => {
    //         console.error("Media device access error:", error);
    //         // Handle errors appropriately
    //     });

    console.log("room id for video chat:", roomId);
    console.log("room id for video chat:", userId);
    console.log("room id for video chat:", userName);

    const zegoRef = useRef<any>(null);

    useEffect(() => {
        const initCall = async () => {
            try {
                const appID = parseInt(import.meta.env.VITE_APPID);
                const serverSecret = import.meta.env.VITE_SERVER_SECRET;

                if (!appID || !serverSecret) {
                    throw new Error("AppID or ServerSecret is missing");
                }

                console.log("appId:", appID);
                console.log("serverSEceter:", serverSecret);
                const tokenExpiryTime = 3600;

                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId.toString(), userId.toString(), userName, tokenExpiryTime);

                console.log('kitToken:',kitToken);

                // create zego instance
                // zegoRef.current = ZegoUIKitPrebuilt.create(kitToken);
                const zc = ZegoUIKitPrebuilt.create(kitToken);

                console.log('zego instance:',zc);

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
                    onerror: (error: any) => {
                        console.log("poyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");

                        console.error("ZEGO Error:", error);
                        onCallEnd?.();
                    },
                });
            } catch (error) {

                console.log("poyyyyyyyyyyyyyyyyy");

                console.error("Failed to initialize video call:", error);
                onCallEnd?.();
            }
        };

        initCall();

        return () => {
            if (zegoRef.current) {
                try {
                    zegoRef.current.destroy();

                    const container = document.querySelector("#video-container");

                    if (container) {
                        container.innerHTML = "";
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
