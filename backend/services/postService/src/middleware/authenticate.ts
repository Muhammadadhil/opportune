import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Forbidden, Unauthorised } from "@_opportune/common";

export const authenticate = (allowedRoles: Array<"client" | "freelancer" | "admin">) => async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"] as string;

    try {
        if (!header || !header.startsWith("Bearer ")) {
            return new Unauthorised("Authorization header is missing or malformed");
        }

        const token = header.split(" ")[1];
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT Access Token Secret is not defined in env");
        }

        if (token) {
            try {
                const decoded = jwt.verify(token, secret) as JwtPayload;
                if (!allowedRoles.includes(decoded.role)) {
                    const error = new Forbidden();
                    next(error);
                }
                next();
            } catch (error) {
                return res.status(401).json({ message: "not authorised , invalid token" });
            }
        }
    } catch (error) {
        next(error)
    }
};
