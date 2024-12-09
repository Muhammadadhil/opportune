import { Request, Response } from "express";
import { OtpService } from "../services/OtpService";

export class OtpController {
    private otpService: OtpService;

    constructor() {
        this.otpService = new OtpService();
        this.verifyOtp = this.verifyOtp.bind(this);
        this.resendOtp = this.resendOtp.bind(this);
    }

    async verifyOtp(req: Request, res: Response) {
        const { otp, email } = req.body;
        const { status, message, success } = await this.otpService.verifyOtp(otp, email);
        res.status(status).json({ success, message });
    }

    async resendOtp(req: Request, res: Response) {
        const { email } = req.body;
        try {
            await this.otpService.sendMail(email);
            res.status(200).json({ success: true, message: "OTP resent successfully" });
        } catch (error) {
            console.error("Error sending OTP:", error);
            res.status(500).json({ success: false, message: "Failed to send OTP" });
        }
    }
}
