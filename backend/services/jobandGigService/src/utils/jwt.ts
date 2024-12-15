import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig";

interface JWTPayload {
    userId: string;
    role: "client" | "freelancer" | "admin";
}

export const verifyToken = (token: string): JWTPayload => {
    return jwt.verify(token, jwtConfig.secret) as JWTPayload;
};
