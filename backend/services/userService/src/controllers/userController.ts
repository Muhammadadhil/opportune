//The controller handles the HTTP request and interacts with the service layer.

import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public registerUser = async (req: Request, res: Response)=> {
        //The return type of an async function or method must be the global Promise<T> type.
        console.log("sign up body:", req.body);

        try {
            const userExists = await this.userService.userExist(req.body.formData.email);
            if (userExists) {
                return res.status(400).json({ message: "user already exists" });
            }
            console.log("sending body!");
            const { user, accessToken, refreshToken } = await this.userService.registerUser(req.body.formData);

            console.log('user in controller:',user);
            res.cookie("jwt-refresh", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/refresh-token",
            });

            console.log("user Registered Successfully");
            return res.status(201).json({
                success: true,
                data: user,
                accessToken,
                message: "User logged in successfully",
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error });
        }
    };

    public login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const { user, accessToken, refreshToken } = await this.userService.login(email, password);

            res.cookie("jwt-refresh", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/refresh-token",
            });
            // delete user.password;
            console.log("user login Successfully");

            return res.status(201).json({
                success: true,
                data: user,
                accessToken,
                message: "User logged in successfully",
            });
        } catch (error: any) {
            console.log("login error:", error);

            if (error.message === "User already exists") {
                return res.status(400).json({ message: error });
            } else if (error.message.includes("Invalid email or password")) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: "Server error", error: error.message });
        }
    };
}
