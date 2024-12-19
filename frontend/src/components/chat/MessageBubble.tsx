// components/MessageBubble.tsx
import React from "react";

interface MessageProps {
    sender: string;
    message: string;
}

const MessageBubble: React.FC<MessageProps> = ({ sender, message }) => {
    const isYou = sender === "You";
    return (
        <div className={`flex my-2 ${isYou ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 max-w-md rounded-lg ${isYou ? "bg-green-200 text-right" : "bg-gray-200"}`}>
                <p className="text-sm">{message}</p>
            </div>
        </div>
    );
};

export default MessageBubble;
