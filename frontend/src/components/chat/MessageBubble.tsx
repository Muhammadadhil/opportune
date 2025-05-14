import React from 'react';
import { Video } from 'lucide-react';

interface MessageBubbleProps {
    sender: string;
    message: string;
    timestamp: string | Date;
    isSender: boolean;
    type: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({sender, timestamp, message, type, isSender }) => {    
    const formatTime = (date: string | Date) => {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getMessageContent = () => {
        switch (type) {
            case 'videoCallStarted': 
                return (
                    <div className="flex items-center gap-2 text-gray-500">
                        <Video className="w-4 h-4" />
                        <span>{message}</span>
                    </div>
                );
            case 'videoCallEnded':
                return (
                    <div className="flex items-center gap-2 text-gray-500">
                        <Video className="w-4 h-4" />
                        <span>{message}</span>
                    </div>
                );
            default:
                return message;
        }
    };

    return (
        <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`max-w-[70%] ${isSender ? "order-2" : "order-1"}`}>
                <div className={`px-4 py-2 rounded-full text-sm ${
                    type === 'videoCallStarted' || type === 'videoCallEnded' 
                        ? 'bg-gray-100 dark:bg-zinc-800' 
                        : isSender 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-white'
                }`}>
                    {getMessageContent()}
                    <span className="text-[13px] text-white-400 w-full ml-2">{formatTime(timestamp)}</span>
                </div>
            </div>
            {!isSender && <div className="w-8 h-8 rounded-full bg-yellow-300  dark:text-black flex-shrink-0 flex items-center justify-center order-0 mr-2">F</div>}
        </div>
    );
};

export default MessageBubble;
