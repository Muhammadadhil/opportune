import { Request, Response, NextFunction } from "express";
import { Forbidden } from '@_opportune/common'
import { UserService } from "../services/implementation/user.services";
import { User } from "../schema/user.schema";
import { UserRepository } from "../repositories/implementation/user.repository";

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

export const authenticate = (allowedRoles: Array<"client" | "freelancer" | "admin">) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const payload = req.user;
        if (req.headers["x-user-payload"]) {
            const user = JSON.parse(req.headers["x-user-payload"] as string);

            console.log("user payload user:", user);

            if (!allowedRoles.includes(user.role)) {
                const error = new Forbidden();
                console.log('!!!! user role is not allowed throwing error !!!!',error);
                next(error);
            }

            const isBlocked = await userService.isUserBlocked(user.userId);

            if (isBlocked) {
                console.log('!!!! user is blocked throwing error !!!!');
                const error = new Forbidden();
                next(error);
            }

        } else {
            console.log("NO user payload on headers !! throwoing forbidden");
            throw new Forbidden();
        }

        next();
    } catch (error) {
        next(error);
    }
};















// import { Request, Response, NextFunction } from "express";
// import { Forbidden } from "@_opportune/common";

// import { MidddlewareService } from "../services/implementation/middleware.services";
// import { UserRepository } from "../repositories/implementation/user.repository";
// import { User } from "../schema/user.schema";

// export class AuthenticateMiddleware {
//     private _midddlewareService: MidddlewareService;

//     constructor(midddlewareService: MidddlewareService) {
//         this._midddlewareService = midddlewareService;
//     }

//     authenticate(allowedRoles: Array<"client" | "freelancer" | "admin">) {
//         return async (req: Request, res: Response, next: NextFunction) => {
//             try {
//                 if (req.headers["x-user-payload"]) {
//                     const user = JSON.parse(req.headers["x-user-payload"] as string);

//                     console.log("user payload userrrrrrrrrrrr:", user);

//                     if (!allowedRoles.includes(user.role)) {
//                         const error = new Forbidden();
//                         next(error);
//                     }

//                     const isBlocked = await this._midddlewareService.isUserBlocked(user._id);

//                     if (isBlocked) {
//                         const error = new Forbidden();
//                         next(error);
//                     }
//                 } else {
//                     throw new Forbidden();
//                 }

//                 next();
//             } catch (error) {
//                 next(error);
//             }
//         };
//     }
// }

// // Usage
// const userRepository = new UserRepository(User);
// const midddlewareService = new MidddlewareService(userRepository);
// const authenticateMiddleware = new AuthenticateMiddleware(midddlewareService);

