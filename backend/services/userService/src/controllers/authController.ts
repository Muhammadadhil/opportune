import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { OAuth2Client } from "google-auth-library";

// const authService = new AuthService();
// const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);

export class AuthController {
    private authService: AuthService;
    private oAuth2Client;

    constructor() {
        this.authService = new AuthService();
        this.loginGoogleUser = this.loginGoogleUser.bind(this);
        this.refreshAccessToken=this.refreshAccessToken.bind(this); 
        this.oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
    }

    async refreshAccessToken(req: Request, res: Response): Promise<Response> {
        try {
            const refreshToken = req.cookies.jwtRefresh;
            // console.log("refresh token from cookies:", refreshToken);           

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
            console.log('req.body:', req.body);
            const { token, role } = req.body;
            const { user, accessToken, refreshToken, authType } = await this.authService.getUserInfo(token, role);

            res.cookie("jwtRefresh", refreshToken, {
                httpOnly: true,
                secure: false, // true in production
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
                path: "/", 
            });

            console.log("new/existing User:", user);

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
}

