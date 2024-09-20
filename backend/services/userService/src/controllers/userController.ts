//The controller handles the HTTP request and interacts with the service layer.

import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.userService.registerUser(req.body);
            if (typeof result === "string") {
                res.status(400).json({ message: result });
            } else {
                res.status(201).json(result);
            }
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
}
