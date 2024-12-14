import { Request, Response, NextFunction } from "express";
import { Unauthorised, CustomError } from "@_opportune/common";
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

export const adminAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Unauthorised("Token not found");
    }

    const token = authHeader.split(" ")[1];
    try {
        const user = jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET!) as UserPayload;
        req.user = user;

        if (user.role !== "admin") {
            const error = new CustomError("Access denied: insufficient permissions", 403);
            next(error);
        }

        next();
    } catch (err) {
        new CustomError("Invalid or expired token", 401);
    }
};
