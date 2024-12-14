import { Request, Response, NextFunction } from "express";
import { Forbidden } from '@_opportune/common'


export const authenticate = (allowedRoles: Array<"client" | "freelancer" | "admin">) => (req: Request, res: Response, next: NextFunction) => {
    try {
        // const payload = req.user;
        if(req.headers["x-user-payload"]) {
            const user = JSON.parse(req.headers["x-user-payload"] as string);
            
            if(!allowedRoles.includes(user.role)) {
                const error = new Forbidden();
                next(error);
            }
        }else{
            throw new Forbidden();
        }

        next();
    } catch (error) {
        next(error);
    }
};

