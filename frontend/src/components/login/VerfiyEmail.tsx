import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { resendOtp, verifyOtp } from "../../api/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../loading/Loading";

export default function OTPVerification() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(120); // 2 minutes in seconds
    const [canResend, setCanResend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.user);

    

    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleVerify = async () => {
        try {
            setIsLoading(true);
            const response = await verifyOtp(otp, userInfo.email, userInfo._id);

            setIsLoading(false);
            if (userInfo.role == "client") {
                navigate("/cl/details");
            } else if(userInfo.role == 'freelancer') {  
                navigate("/fr/dashboard");
            }
            console.log(response);
        } catch (error) {
            setIsLoading(false);
            console.log("error api response:", error);
            setError(error.response.data.message);

            setTimeout(() => {
                if (error) {
                    setError("");
                }
            }, 5000);
        }
    };

    const handleResendOtp = async () => {
        await resendOtp(userInfo.email);
        console.log("Resending OTP...");
        setTimer(120);
        setCanResend(false);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="max-w-md w-full space-y-8 p-8 ">
                    <h1 className="text-3xl font-bold text-center text-gray-900">Verify your OTP</h1>
                    <p className="mt-2 text-center text-gray-600">
                        We've sent a one-time password to <span className="text-slate-900 " >{userInfo.email}</span>. Please enter the OTP below to verify your account.
                    </p>
                    <div className="mt-5 space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            maxLength={4}
                        />
                        <div className="flex justify-center">{error ? <p className="text-red-600 text-sm">{error}</p> : ""}</div>
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
            )}
        </div>
    );
}
