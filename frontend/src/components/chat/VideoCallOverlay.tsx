import { createPortal } from "react-dom";
import VideoCall from "./VideoCall";
import { X } from "lucide-react";
import { useEffect } from "react";
// import { useEffect } from "react";

interface VideoCallProps {
    roomId: string;
    userId: string;
    userName: string;
    onCallEnd?: () => void;
}

const VideoCallOverlay: React.FC<VideoCallProps> = ({ ...props }) => {
    
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
            // Ensure the container is cleared when the overlay is removed
            const container = document.querySelector("#video-container");
            if (container) {
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            }
        };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-50 bg-black">
            <button 
                onClick={() => {

                    props.onCallEnd?.();
                    // // First stop the media tracks
                    // if (navigator.mediaDevices) {
                    //     navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                    //         .then(stream => {
                    //             stream.getTracks().forEach(track => track.stop());
                    //         })
                    //         .catch(err => console.error("Error releasing media devices:", err));
                    // }
                }} 
                className="absolute top-4 right-4 z-50 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700"
            >
                <X className="w-6 h-6" />
            </button>
            <VideoCall {...props} />
        </div>,
        document.body
    );
};


export default VideoCallOverlay;