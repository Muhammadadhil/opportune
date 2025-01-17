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
        };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-50 bg-black">
            <button onClick={props.onCallEnd} className="absolute top-4 right-4 z-50 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700">
                <X className="w-6 h-6" />
            </button>
            <VideoCall {...props} />
        </div>,
        document.body
    );
};


export default VideoCallOverlay;