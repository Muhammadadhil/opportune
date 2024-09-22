const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "ghost" }> = ({ children, variant = "default", ...props }) => (
    <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${variant === "ghost" ? "text-gray-700 hover:bg-gray-100" : "bg-primary text-gray-700 hover:bg-gray-100"}`}
        {...props}
    >
        {children}
    </button>
);

export default Button;
