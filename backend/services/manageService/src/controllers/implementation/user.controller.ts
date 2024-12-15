import { IUser } from "@_opportune/common";
import { inject, injectable } from "inversify";
import {IUserController} from '../interface/IUserController';
import { TYPES } from "../../interfaces/types";
import { IUserService } from "../../services/interfaces/IUserService";
import { Request, Response, NextFunction } from "express";

@injectable()
export class UserController implements IUserController {
    private userService: IUserService;

    constructor(@inject(TYPES.IUserService) userService: IUserService) {
        this.userService = userService;
        console.log("UserController initialized with userService:", this.userService);
        this.getUsers = this.getUsers.bind(this);

    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        console.log("getttingg userrrrrrrrrrrrrrrrrrrrrssssssssss !!!");

        try {
            console.log("req.query:", req.query);
            const { page = 1, limit = 10 } = req.query;
            let users;
            let totalPages;

            if (req.query.searchKey) {
                console.log("req.query.searchKey:", req.query.searchKey);
                const searchKey = req.query.searchKey;
                const { AllUsers, totalPagesCount } = await this.userService.getUsers(page as number, limit as number, searchKey as string);

                users = AllUsers;
                totalPages = totalPagesCount;
            } else {
                const { AllUsers, totalPagesCount } = await this.userService.getUsers(page as number, limit as number);
                users = AllUsers;
                totalPages = totalPagesCount;
            }
            res.status(200).json({ users, totalPages });
        } catch (error) {
            next(error);
        }
    }
}