interface MessageBubbleProps {
    sender: string;
    message: string;
    timestamp: string | Date;
    isSender: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, timestamp, isSender }) => {

    const formatTime = (date: string | Date) => {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`max-w-[70%] ${isSender ? "order-2" : "order-1"}`}>
                <div className={`px-4 py-2 rounded-full text-sm ${isSender ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"}`}>
                    {message}
                    <span className="text-[13px] text-white-400 w-full ml-2">{formatTime(timestamp)}</span>
                </div>
            </div>
            {!isSender && <div className="w-8 h-8 rounded-full bg-yellow-300 flex-shrink-0 flex items-center justify-center order-0 mr-2">H</div>}
        </div>
    );
};

export default MessageBubble;
