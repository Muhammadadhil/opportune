import { Unauthorised } from "@_opportune/common";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        role: "client" | "freelancer" | "admin";
    };
}

interface UserPayload extends JwtPayload {
    userId: string;
    role: "client" | "freelancer" | "admin";
}

const isTokenExpired = (token: string): boolean => {
    
    const decoded = jwt.decode(token) as JwtPayload | null;
    
    if (!decoded || !decoded.exp) {
        throw new Unauthorised("Invalid token");
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
};

export const verifyToken = (secret: string) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            console.log("!!!!! verifying token !!!!!");

            const token = req.headers["authorization"]?.split(" ")[1];

            if (!token) throw new Unauthorised("Token not found");

            if (isTokenExpired(token)) {
                throw new Unauthorised("Token expired");
            }

            const payload = jwt.verify(token, secret) as UserPayload | null;
            if (!payload) throw new Unauthorised("Invalid token");
            
            // req.user = payload;

            req.headers["x-user-payload"] = JSON.stringify(payload);
            next();

        } catch (err) {
            next(err);
        }
    };
};
