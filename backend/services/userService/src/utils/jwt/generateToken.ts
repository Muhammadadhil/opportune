import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

interface TokenPayload {
    userId: string;
    role: string;
}
    
export const generateAccessToken = (userId: string, role: string) => {
    const payload: TokenPayload = { userId, role };
    return jwt.sign(payload, process.env.JWT_ACCESSTOKEN_SECRET!, { expiresIn: "45m" });
};

export const generateRefreshToken = (userId: string, role: string) => {
    const payload: TokenPayload = { userId, role };
    return jwt.sign(payload, process.env.JWT_REFRESHTOKEN_SECRET!, { expiresIn: "2d" });
};

