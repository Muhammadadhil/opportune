import ForgotPassword from "@/components/login/ForgotPassword";
import React from "react";

export const ForgotPasswordPage:React.FC = React.memo(()=> {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <ForgotPassword />
        </div>
    );
})
