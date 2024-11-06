import jwt from "jsonwebtoken";

interface TokenPayload {
    userId: string;
    role: string;
}

export const generateAccessToken = (userId: string, role: string) => {
    const payload: TokenPayload = { userId, role };
    return jwt.sign(payload, process.env.JWT_ACCESSTOKEN_SECRET!, { expiresIn: "5m" });
};

export const generateRefreshToken = (userId: string, role: string) => {
    const payload: TokenPayload = { userId, role };
    return jwt.sign(payload, process.env.JWT_REFRESHTOKEN_SECRET!, { expiresIn: "2d" });
};
