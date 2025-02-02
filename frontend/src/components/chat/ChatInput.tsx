import React, { useState } from "react";
import { Send } from "lucide-react";

export enum messageType {
    text = "text",
    image = "image",
    file = "file",
}

interface ChatInputProps {
    onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="px-4 py-3 border-t dark:border-zinc-800 border-gray-200 bg-white dark:bg-zinc-900">
            <div className="flex items-center gap-2">
                {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Smile className="w-5 h-5 text-gray-500" />
                </button> */}
                {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                </button> */}
                {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Image className="w-5 h-5 text-gray-500" />
                </button> */}

                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    />
                </div>

                {message.trim() && (
                    <button onClick={sendMessage} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
                        <Send className="w-5 h-5 text-white" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ChatInput;
