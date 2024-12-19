// components/ChatInput.tsx
import React, { useState } from "react";

const ChatInput: React.FC = () => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        console.log("Message Sent:", message);
        setMessage("");
    };

    return (
        <div className="p-4 bg-white border-t flex">
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className="flex-1 p-2 border rounded-l outline-none" />
            <button onClick={sendMessage} className="bg-green-500 text-white px-4 rounded-r hover:bg-green-600">
                Send
            </button>
        </div>
    );
};

export default ChatInput;
