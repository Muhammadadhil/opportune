import { Request, Response } from "express";
import { AuthService } from "../services/implementation/authService";
import { OAuth2Client } from "google-auth-library";
import { NextFunction } from "express-serve-static-core";

export class AuthController {
    private authService: AuthService;
    private oAuth2Client;

    constructor() {
        this.authService = new AuthService();
        this.loginGoogleUser = this.loginGoogleUser.bind(this);
        this.refreshAccessToken = this.refreshAccessToken.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
    }

    async refreshAccessToken(req: Request, res: Response): Promise<Response> {
        try {
            const refreshToken = req.cookies.jwtRefresh;

            if (!refreshToken) {
                return res.status(400).json({ message: "No Refresh token found" });
            }

            const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
            if (!newAccessToken) {
                return res.status(400).json({ message: "Invalid refresh token" });
            }
            return res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            console.error("Error refreshing access token:", error);
            return res.status(500).json({ error: "Failed to refresh access token" });
        }
    }

    async getGoogleAuthToken(req: Request, res: Response): Promise<void> {
        const { code } = req.body;
        console.log("code:", code);
        try {
            // Exchange the code for tokens
            const { tokens } = await this.oAuth2Client.getToken(code);
            console.log("tokens:", tokens);

            res.json(tokens);
        } catch (error) {
            console.error("Error exchanging code for tokens:", error);
            res.status(500).json({ error: "Failed to obtain tokens" });
        }
    }

    async loginGoogleUser(req: Request, res: Response): Promise<Response> {
        try {
            const { token, role } = req.body;
            const { user, accessToken, refreshToken, authType } = await this.authService.getUserInfo(token, role);

            res.cookie("jwtRefresh", refreshToken, {
                httpOnly: true,
                secure: false, // true in production
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
                path: "/",
            });

            return res.status(201).json({
                success: true,
                data: user,
                authType,
                accessToken,
                message: "User logged in successfully",
            });
        } catch (error) {
            console.log("Error fetching user info:", error);
            return res.status(400).json({ message: "Error fetching user info" });
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this.authService.forgotPassword(email);
            res.status(200).json({
                success: true,
                message: "OTP sent successfully",
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, newPassword } = req.body;
            const user = await this.authService.resetPassword(email, newPassword);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}

