import jwt, { JwtPayload } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt/generateToken";
import axios from "axios";
import { UserRepository } from "../../repositories/implementation/UserRepository";
import IUser from "../../interfaces/IUser";
import IAuthService from "../interfaces/IAuthService";

export class AuthService implements IAuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async refreshAccessToken(refreshToken: string): Promise<string | null> {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET!) as JwtPayload;
            if (!decoded) {
                console.log("invalid token");
                return null;
            }
            const { userId, role } = decoded;
            console.log("userId: role: from decoded obj:", userId, role);

            const newAccessToken = generateAccessToken(userId, role);
            return newAccessToken;
        } catch (error) {
            return null;
        }
    }

    async getUserInfo(token: string, role?: string): Promise<any> {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        const data = response.data;
        data.role = role;

        console.log("googleapi response data:", data);
        let user = await this.userRepository.findOne({ email: data.email });

        let authType;
        if (user) {
            const accessToken = generateAccessToken(user._id.toString(), user.role);
            const refreshToken = generateRefreshToken(user._id.toString(), user.role);
            authType = "login";
            return { user, accessToken, refreshToken };
        }

        const googleUser: Partial<IUser> = {
            firstname: data.given_name,
            lastname: data.family_name,
            email: data.email,
            role: data.role || "client",
            isOAuthUser: true,
        };

        const gUser = await this.userRepository.create(googleUser as IUser);
        user = gUser.toObject();

        const accessToken = generateAccessToken(user!._id.toString(), user!.role);
        const refreshToken = generateRefreshToken(user!._id.toString(), user!.role);
        authType = "signup";
        return { user, accessToken, refreshToken, authType };
    }
}
