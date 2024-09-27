import jwt, { JwtPayload } from "jsonwebtoken";
import { generateAccessToken } from "../utils/jwt/generateToken";

export class AuthService {

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
}
