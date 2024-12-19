// components/ChatSidebar.tsx
import React from "react";


    // chat rooms listing 

const messages = [
    { name: "bahir", time: "6:28 PM", preview: "You: See you shortly" },
    { name: "shahir", time: "4:11 PM", preview: "Ralph: Sent an image" },
    { name: "pr", time: "Yesterday", preview: "You: I'm not sure" },
];

const ChatSidebar: React.FC = () => {
    return (
        <div className="w-3/12 h-screen border-r bg-white">
            <div className="p-4 text-xl font-bold border-b">Messages</div>
            <input className="w-full p-2 border-b outline-none" placeholder="Search" />
            <ul>
                {messages.map((msg, idx) => (
                    <li key={idx} className="p-3 hover:bg-gray-100 cursor-pointer flex flex-col border-b">
                        <span className="font-medium">{msg.name}</span>
                        <span className="text-xs text-gray-500">
                            {msg.time} - {msg.preview}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;
