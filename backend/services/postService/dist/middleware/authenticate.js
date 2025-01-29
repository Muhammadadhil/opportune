"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const common_1 = require("@_opportune/common");
const inversify_1 = __importDefault(require("../config/inversify"));
const types_1 = require("../types/types");
const userService = inversify_1.default.get(types_1.TYPES.IUserService);
const authenticate = (allowedRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('!!!! authenticting in service level !!!!');
        // const payload = req.user;
        if (req.headers["x-user-payload"]) {
            const user = JSON.parse(req.headers["x-user-payload"]);
            console.log('user:', user);
            if (!allowedRoles.includes(user.role)) {
                const error = new common_1.Forbidden();
                console.log("!!!! user role is not allowed throwing error !!!! jobService : ", error);
                next(error);
            }
            if (user.role == 'admin') {
                return next();
            }
            const isBlocked = yield userService.isUserBlocked(user.userId);
            if (isBlocked) {
                console.log("!!!! user is blocked throwing error !!!!");
                const error = new common_1.Forbidden();
                next(error);
            }
        }
        else {
            console.log("NO user payload on headers !! throwoing forbidden");
            throw new common_1.Forbidden();
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authenticate = authenticate;
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
