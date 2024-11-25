import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { HTTPError } from "../utils/HttpError";

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        role: "client" | "freelancer" | "admin";
    };
}

export const authenticate = (allowedRoles: Array<"client" | "freelancer" | "admin">) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new HTTPError("Access token missing or invalid", 401);
    }

    const token = authHeader.split(" ")[1];
    try {
        const user = verifyToken(token);
        req.user = user;

        if (!allowedRoles.includes(user.role)) {
            const error = new HTTPError("Access denied: insufficient permissions", 403);
            next(error);
        }

        next();
    } catch (err) {
        new HTTPError("Invalid or expired token", 401);
    }
};
