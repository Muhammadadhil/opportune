import { IUser } from "@_opportune/common";
import { inject, injectable } from "inversify";
import {IUserController} from '../interface/IUserController';
import { TYPES } from "../../interfaces/types";
import { IUserService } from "../../services/interfaces/IUserService";
import { Request, Response, NextFunction } from "express";
import { ObjectId, Types } from "mongoose";

@injectable()
export class UserController implements IUserController {
    private userService: IUserService;

    constructor(@inject(TYPES.IUserService) userService: IUserService) {
        this.userService = userService;
        this.getUsers = this.getUsers.bind(this);
        this.toggleBlockStatus = this.toggleBlockStatus.bind(this);
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

    async toggleBlockStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id=req.params.userId;
            const userId = new Types.ObjectId(id);
            
            if (!userId ) {
                res.status(400).json({ message: "Invalid input" });
                return;
            }
            const message = await this.userService.toggleBlockStatus(userId as unknown as ObjectId);
            res.status(200).json({ message });
        } catch (error) {
            next(error);
        }
    }
}