import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { verifyOtp, resendOtp } from "../../api/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface UserInfo {
    email: string;
    _id: string;
}

interface UserState {
    user: {
        userInfo: UserInfo;
    };
}

export default function OTPVerification() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(120); // Start with 120 seconds
    const [canResend, setCanResend] = useState(false);

    const navigate = useNavigate();

    const { userInfo } = useSelector((state: UserState) => state.user);

    console.log("userInfo from global state:", userInfo);

    useEffect(() => {
        const endTime = localStorage.getItem("otpEndTime");
        if (endTime) {
            const remainingTime = Math.round((parseInt(endTime) - Date.now()) / 1000);
            if (remainingTime > 0) {
                setTimer(remainingTime);
                setCanResend(false); // Prevent showing "Resend OTP" button initially
            } else {
                setTimer(0);
                setCanResend(true);
            }
        } else {
            // If no endTime in localStorage, start a new timer
            startTimer();
        }
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        setCanResend(true); // Enable "Resend OTP" when timer ends
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    const startTimer = () => {
        const endTime = Date.now() + 120000;
        localStorage.setItem("otpEndTime", endTime.toString());
        setTimer(120);
        setCanResend(false); // Reset "canResend" when a new OTP is sent
    };

    const handleVerify = async () => {
        try {
            const response = await verifyOtp(otp, userInfo.email, userInfo._id);
            console.log(response);
            localStorage.removeItem("otpEndTime");
            navigate("/");
        } catch (error: any) {
            console.log("error api response:", error);
            setError(error.response?.data?.message || "Verification failed");
            setTimeout(() => setError(""), 5000);
        }
    };

    const handleResendOtp = async () => {
        try {
            await resendOtp(userInfo.email);
            console.log("Resending OTP...");
            startTimer();
        } catch (error: any) {
            console.log("Error resending OTP:", error);
            setError("Failed to resend OTP. Please try again.");
            setTimeout(() => setError(""), 5000);

        }
    };

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-8">
                <h1 className="text-3xl font-bold text-center text-gray-900">Verify your OTP</h1>
                <p className="mt-2 text-center text-gray-600">We've sent a one-time password to your email. Please enter the OTP below to verify your account.</p>
                <div className="mt-5 space-y-4">
                    <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        maxLength={4}
                    />
                    <div className="flex justify-center">{error && <p className="text-red-600 text-sm">{error}</p>}</div>
                    <div className="text-center text-sm text-gray-600">
                        {canResend ? (
                            <Button onClick={handleResendOtp} variant="link" className="text-blue-600">
                                Resend OTP
                            </Button>
                        ) : (
                            <p>Resend OTP in: {formatTime(timer)}</p>
                        )}
                    </div>
                    <Button onClick={handleVerify} disabled={otp.length !== 4} className="w-full">
                        Verify
                    </Button>
                </div>
            </div>
        </div>
    );
}
