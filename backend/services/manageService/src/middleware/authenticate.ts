import { Request, Response, NextFunction } from "express";
import { Unauthorised, CustomError, Forbidden } from "@_opportune/common";
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

    console.log('authenticating admin !!!');

    const authHeader = req.headers.authorization;
    try {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return new Unauthorised("Token not found");
        }

        const token = authHeader.split(" ")[1];

        const user = jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET!) as UserPayload;
        req.user = user;

        if (user.role !== "admin") {
            
            const error = new Forbidden();
            next(error);
        }

        next();
    } catch (err) {
        console.log("err:", err);  
        new Unauthorised('Invalid token');
        next(err);
    }
};
