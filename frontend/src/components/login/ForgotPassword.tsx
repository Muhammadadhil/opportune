import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { forgotPassword, resetPassword } from "@/api/user";
import { verifyOtp } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await forgotPassword(email);
            console.log(data);

            toast({
                title: "OTP Sent",
                description: "Check you mail",
            });
            setStep(2);
        } catch (error) {
            console.log(error);

            toast({
                variant: "destructive",
                title: "Error",
                description: error instanceof Error ? error.response.data.message : "Failed to send OTP. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await verifyOtp(otp, email);
            setStep(3);
        } catch (error) {
            console.log("Error:" + error);
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const navigate = useNavigate();

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match",
                description: "Please ensure both passwords are the same.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const data = await resetPassword(email, password);
            console.log(data)
            toast({
                title: "Password Reset Successful",
                description: "You can now log in with your new password.",
            });
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-[600px] min-h-[350px] flex flex-col justify-center">
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <CardHeader>
                        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
                            Opportune<span className="text-green-600">.</span>
                        </h2>
                        <CardTitle>Forgot Password</CardTitle>
                        <CardDescription>
                            {step === 1 && "Enter your email to reset your password."}
                            {step === 2 && "Enter the OTP sent to your email."}
                            {step === 3 && "Enter your new password."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>
                            </form>
                        )}
                        {step === 2 && (
                            <form onSubmit={handleOtpSubmit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5 w-80">
                                        <Label htmlFor="otp">OTP</Label>
                                        <Input id="otp" type="text" placeholder="Enter OTP" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value)} required />
                                    </div>
                                </div>
                            </form>
                        )}
                        {step === 3 && (
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">New Password</Label>
                                        <Input id="password" type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        {/* {step > 1 && (
                    <Button variant="outline" onClick={() => setStep(step - 1)}>
                        Back
                    </Button>
                )} */}
                        <Button
                            className="bg-green-700 hover:bg-green-600"
                            type="submit"
                            onClick={(e) => {
                                if (step === 1) handleEmailSubmit(e);
                                else if (step === 2) handleOtpSubmit(e);
                                else if (step === 3) handlePasswordSubmit(e);
                            }}
                            disabled={step == 2 && otp.length !== 4}
                        >
                            {isLoading ? "Loading..." : step === 3 ? "Reset Password" : "Continue"}
                        </Button>
                    </CardFooter>
                </div>
            )}
        </Card>
    );
}
