import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../utils/HttpError";


export const authenticate = (allowedRoles: Array<"client" | "freelancer" | "admin">) => (req: Request, res: Response, next: NextFunction) => {
    try {
        // const payload = req.user;
        if(req.headers["x-user-payload"]) {
            const user = JSON.parse(req.headers["x-user-payload"] as string);
            
            if(!allowedRoles.includes(user.role)) {
                const error = new HTTPError("Access denied: insufficient permissions", 403);
                next(error);
            }
        }else{
            throw new HTTPError("Access denied: insufficient permissions", 400);
        }

        next();
    } catch (error) {
        next(error);
    }
};

