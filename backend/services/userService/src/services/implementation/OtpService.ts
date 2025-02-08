import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { OtpRepository } from "../../repositories/implementation/OtpRepository";
import { UserRepository } from "../../repositories/implementation/UserRepository";
import { IOtp } from "../../interfaces/IOtp";
import IOtpService from "../interfaces/IOtpService";

export class OtpService implements IOtpService {
    private otpRepository: OtpRepository;
    private userRepository: UserRepository;

    constructor() {
        this.otpRepository = new OtpRepository();
        this.userRepository = new UserRepository();
    }

    async sendMail(email: string) {
        //nodemailer-mail transporter
        const transpoter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_USER_PASSWORD,
            },
        });

        try {
            console.log(" otp verification email sending function !!!");

            const otp = `${Math.floor(3000 + Math.random() * 900)}`;
            console.log(" Generated OTP:" + otp);

            //mail option
            const mailOptions = {
                from: "muhammadadhil934@gmail.com",
                to: email,
                subject: "Two factor Authentication",
                html: `
            <html>
                <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h1 style="color: #000;">Oppotune.</h1>
                        <h2 style="color: #333;">Verify Your Email Address</h2>
                        <p style="color: #555; line-height: 1.5;">Enter the following OTP code to verify your email address. This code will expire in 1 minutes:</p>
                        <p style="font-size: 24px; font-weight: bold; color: #007bff;">${otp}</p>
                        <p style="color: #555; line-height: 1.5;">If you did not request this verification, please ignore this email.</p>
                    </div>
                </body>
            </html>`,
            };

            //hash the otp
            const saltRounds = 10;
            const hashedOtp = await bcrypt.hash(otp, saltRounds);

            const otpData = {
                email,
                otp: hashedOtp,
            } as IOtp;

            await this.otpRepository.create(otpData);

            //send the mail
            await transpoter.sendMail(mailOptions);
        } catch (error) {
            console.log("error while sending email : ", error);
        }
    }

    async verifyOtp(otp: string, email: string): Promise<{ success: boolean; message: string; status: number }> {
        try {
            const userDetails = await this.userRepository.findOne({ email });
            if (!userDetails) {
                return { success: false, message: "Error occurred. User email not found", status: 404 };
            }

            const otpDetails = await this.otpRepository.findOne({ email });
            if (!otpDetails) {
                return { success: false, message: "Invalid OTP", status: 400 };
            }

            const matchedOtp = await bcrypt.compare(otp, otpDetails.otp);
            if (matchedOtp) {
                await this.otpRepository.delete(otpDetails._id as string);
                await this.userRepository.changeVerifiedStatus(email, true);

                return { success: true, message: "OTP verified!", status: 200 };
            } else {
                return { success: false, message: "Invalid OTP .", status: 400 };
            }
        } catch (error) {
            console.log("Otp verify error:", error);
            return { success: false, message: "Error verifying otp", status: 400 };
        }
    }
}
