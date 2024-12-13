import { HTTPError } from "@_opportune/common";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


const isTokenExpired = (token: string): boolean => {
    
    const decoded = jwt.decode(token) as JwtPayload | null;
    
    if (!decoded || !decoded.exp) {
        throw new HTTPError("Invalid token", 401);
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
};

export const verifyToken = (secret: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {

            console.log('!!!!! verifying token !!!!!');

            const token = req.headers["authorization"]?.split(" ")[1];

            if (!token) throw new HTTPError("Token not found", 401);

            if (isTokenExpired(token)) {
                throw new HTTPError("Token expired", 401);
            }

            const payload = jwt.verify(token, secret);
            if (!payload) throw new HTTPError("Invalid token", 401);

            console.log('payload',payload);

            req.headers["user-payload"] = JSON.stringify(payload);
            next();
        } catch (err) {
            next(err);
        }
    };
};
