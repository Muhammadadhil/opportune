import React from "react";
import { motion } from "framer-motion";

interface LoadingDotsProps {
    color?: string;
    size?: "small" | "medium" | "large";
    text?: string;
}

const Loading: React.FC<LoadingDotsProps> = ({ color = "green-600", size = "large", text }) => {
    const sizeClasses = {
        small: "w-1.5 h-1.5",
        medium: "w-2 h-2",
        large: "w-3.5 h-3.5",
    };

    const containerClasses = {
        small: "gap-1",
        medium: "gap-1.5",
        large: "gap-2",
    };

    const bubbleVariants = {
        initial: { y: 0 },
        animate: { y: -10 },
    };

    const colors: { [key: number]: string } = {
        0: "green-600",
        1: "green-700",
        2: "green-600"
    };

    return (    
        <div className="h-screen flex flex-col items-center justify-center space-y-2">
            <div className={`flex items-center ${containerClasses[size]}`}>
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className={`
                            ${sizeClasses[size]} 
                            rounded-full 
                            bg-${colors[index]}
                        `}
                        variants={bubbleVariants}
                        initial="initial"
                        animate="animate"
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: index * 0.2,
                        }}
                    />
                ))}
            </div>
            {text && <p className={`text-sm text-${color} font-medium mt-5`}>{text}</p>}
        </div>
    );
};

export default Loading;
