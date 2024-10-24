import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { OAuth2Client } from "google-auth-library";


const authService = new AuthService();
const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);

async function refreshAccessToken(req: Request, res: Response): Promise<Response> {
    console.log('cookeis::',req.cookies);
    
    const refreshToken = req.cookies.jwtRefresh;
    console.log("refresh token from cookies:", refreshToken);

    if (!refreshToken) {
        return res.status(400).json({ message: "No Refresh token found" });
    }

    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    if (!newAccessToken) {
        return res.status(400).json({ message: "Invalid refresh token" });
    }

    return res.status(200).json({ accessToken: newAccessToken });
}

async function getGoogleAuthToken(req: Request, res: Response): Promise<void> {
    const { code } = req.body;
    console.log("code:", code);
    try {
        // Exchange the code for tokens
        const { tokens } = await oAuth2Client.getToken(code);
        console.log("tokens:", tokens);

        res.json(tokens);
    } catch (error) {
        console.error("Error exchanging code for tokens:", error);
        res.status(500).json({ error: "Failed to obtain tokens" });
    }
}

async function getGoogleUserInfo(req: Request, res: Response): Promise<Response> {
    try {
        const { token, role, authType } = req.body;
        console.log('authType:',authType)
        console.log("google token:", token);
        const userInfo = await authService.getUserInfo(token, authType,role);

        console.log("new/existing User:", userInfo);
        // if (typeof userInfo == "string" && authType!="login") {
        //     return res.status(400).json({ message: "User already exists" });
        // }
        return res.status(200).json({ userInfo });
    } catch (error) {
        console.log("Error fetching user info:", error);
        return res.status(400).json({ message: "Error fetching user info" });
    }
}

export { refreshAccessToken, getGoogleAuthToken, getGoogleUserInfo };
