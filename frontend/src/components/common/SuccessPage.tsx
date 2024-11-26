import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

interface SuccessPageProps {
    defaultMessage?: string;
    defaultRedirectPath?: string;
    defaultRedirectTime?: number;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ defaultMessage = "Operation Successful!", defaultRedirectPath = "/dashboard", defaultRedirectTime = 3000 }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as {
        message?: string;
        redirectPath?: string;
        redirectTime?: number;
    } | null;

    const message = state?.message || defaultMessage;
    const redirectPath = state?.redirectPath || defaultRedirectPath;
    const redirectTime = state?.redirectTime || defaultRedirectTime;

    const [props, api] = useSpring(() => ({
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
        config: { tension: 300, friction: 10 },
    }));

    useEffect(() => {
        const timer = setTimeout(() => {
            api.start({
                to: { opacity: 0, scale: 0.8 },
                onRest: () => navigate(redirectPath),
            });
        }, redirectTime);

        return () => clearTimeout(timer);
    }, [navigate, api, redirectPath, redirectTime]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <animated.div style={props} className="text-center p-8 rounded-lg shadow-lg bg-card">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h1 className="text-2xl font-bold mb-2 text-foreground">{message}</h1>
                <p className="text-muted-foreground">Redirecting...</p>
            </animated.div>
        </div>
    );
};

export default SuccessPage;
