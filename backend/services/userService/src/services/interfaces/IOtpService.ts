export default interface IOtpService {
    sendMail(email: string): Promise<void>;
    verifyOtp(otp: string, email: string): Promise<{ success: boolean; message: string; status: number }>;
}