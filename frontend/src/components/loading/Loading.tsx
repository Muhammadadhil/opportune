interface LoadingDotsProps {
    color?: string;
    size?: "small" | "medium" | "large";
    text?: string;
}

const Loading: React.FC<LoadingDotsProps> = ({ color = "green-600", size = "large", text }) => {
    const sizeClasses = {
        small: "size-1.5",
        medium: "size-2",
        large: "size-3.5",
    };

    const containerClasses = {
        small: "gap-1",
        medium: "gap-1.5",
        large: "gap-2",
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className={`flex items-center ${containerClasses[size]}`}>
                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        className={`
              ${sizeClasses[size]} 
              rounded-full 
              bg-${color} 
              animate-bounce9
              ${index === 1 ? "!size-3" : ""}
            `}
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            animationDuration: "0.6s",
                        }}
                    />
                ))}
            </div>
            {text && <p className={`text-sm text-${color} font-medium mt-2`}>{text}</p>}
        </div>
    );
};

export default Loading;
