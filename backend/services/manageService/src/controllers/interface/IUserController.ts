import { Request,Response, NextFunction } from "express";


export interface IUserController {
    getUsers(req: Request, res: Response, next: NextFunction): Promise<void>;

}