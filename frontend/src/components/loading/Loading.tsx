import React from "react";

interface LoadingBarsProps {
    color?: string;
    size?: "small" | "medium" | "large";
    text?: string;
}

const LoadingBars: React.FC<LoadingBarsProps> = ({ color = "green-600", size = "large", text }) => {
    const sizeClasses = {
        small: "h-3 w-1 mx-0.5",
        medium: "h-5 w-1.5 mx-1",
        large: "h-8 w-2 mx-1.5",
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-end">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className={`${sizeClasses[size]} bg-${color} animate-pulse`} style={{ animationDelay: `${index * 0.15}s` }}></div>
                ))}
            </div>
            {text && <p className={`text-sm text-${color} font-medium mt-2`}>{text}</p>}
        </div>
    );
};

export default LoadingBars;
