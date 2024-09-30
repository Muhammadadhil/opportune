// // src/controllers/authController.ts
// import { Request, Response } from "express";
// import { AuthService } from "../services/authService";
// import { OAuth2Client } from "google-auth-library";

// import { User } from "../schema/User";
// import { Console } from "console";

// export class AuthController {
//     private authService: AuthService;

//     constructor() {
//         this.authService = new AuthService();
//     }

//     public refreshAccessToken = async (req: Request, res: Response): Promise<Response> => {
//         // const refreshTokenName = req.body;
//         const refreshToken = req.cookies["jwt-refresh"];
//         console.log("refresh token from cookies:", refreshToken);

//         if (!refreshToken) {
//             return res.status(400).json({ message: "No Refresh token found" });
//         }

//         const newAccessToken = await this.authService.refreshAccessToken(refreshToken);
//         if (!newAccessToken) {
//             return res.status(400).json({ message: "Invalid refresh token" });
//         }

//         return res.status(200).json({ accessToken: newAccessToken });
//     };

//     async getGoogleAuthToken(req: Request, res: Response): Promise<void> {
//         const {code}=req.body;
//         const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
//         console.log(tokens);

//         res.json(tokens);

//     }

//     async googleAuth(req: Request, res: Response): Promise<void> {
//         try {
//             const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

//             console.log("OAuth2Client-client:", client);

//             const { token, role } = req.body;
//             console.log("token:", token + "role:" + role);

//             // const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
//             const ticket = await client.getTokenInfo(token);
//             await client.console.log("tokenInfo:", ticket);

//             // const { email, name, given_name, family_name, picture } = (await ticket).getPayload();

//             // let user;
//             // const payload = await ticket.getPayload();
//             // if (payload) {
//             //     const email = payload.email;
//             //     const name = payload.name;
//             //     const picture = payload.picture;

//             //     // Now you can safely use email, name, and picture
//             //     console.log(email, name, picture);
//             //     user = await User.findOne({ email });
//             // } else {
//             //     // Handle case where payload is undefined
//             //     throw new Error("Failed to retrieve user information from Google.");
//             // }
//             // console.log("existing user:", user);

//             // if (!user) {
//             //     //save the user
//             //     // user = new User({ email, firstname, lastname, role, picture, provider: "google" });
//             //     // user.save();
//             //     console.log("user llyaaa");
//             // }

//             // res.json({
//             //     success: true,
//             //     user: {
//             //         _id: user?._id,
//             //         email: user?.email,
//             //         firstname: user?.firstname,
//             //         lastname: user?.lastname,
//             //         role: user?.role,
//             //     },
//             // });
//         } catch (error) {
//             console.log("full error:", error);
//         }
//     }
// }

// authController.ts
import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { OAuth2Client } from "google-auth-library";

import { User } from "../schema/User";

const authService = new AuthService();
const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);

async function refreshAccessToken(req: Request, res: Response): Promise<Response> {
    const refreshToken = req.cookies["jwt-refresh"];
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

    // res.json(tokens);
}

async function getGoogleUserInfo(req: Request, res: Response): Promise<Response> {
    try {
        const { token, role } = req.body;
        const userInfo = await authService.getUserInfo(token,role);

        console.log(userInfo); 
        
        return res.status(200).json({userInfo});
        
    } catch (error) {
        console.log("Error fetching user info:", error);
        return res.status(400).json({message:"Error fetching user info"});
    }
}

// Export the functions
export { refreshAccessToken, getGoogleAuthToken, getGoogleUserInfo };
