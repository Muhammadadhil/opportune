//The controller handles the HTTP request and interacts with the service layer.

import { Request, Response } from "express";
import { UserService } from "../services/implementation/UserService";
import { OtpService } from "../services/implementation/OtpService";
import IClientDetail from "../interfaces/IClientDetail";
import { ObjectId } from "mongoose";

export class UserController {
    private userService: UserService;
    private otpService: OtpService;

    constructor() {
        this.userService = new UserService();
        this.otpService = new OtpService();
        this.saveClientDetails = this.saveClientDetails.bind(this);
        this.saveFreelancerDetails = this.saveFreelancerDetails.bind(this);
        this.getFreelancerData = this.getFreelancerData.bind(this);
        this.getClientData = this.getClientData.bind(this);
        this.getFreelancers= this.getFreelancers.bind(this);
    }

    public registerUser = async (req: Request, res: Response) => {
        try {
            const userExists = await this.userService.userExist(req.body.formData.email);
            if (userExists) {
                return res.status(400).json({ message: "user already exists" });
            }
            const { user, accessToken, refreshToken } = await this.userService.registerUser(req.body.formData);

            res.cookie("jwtRefresh", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // true in production
                sameSite: "strict", // Use 'none' in production with secure: true
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: "/",
            });

            this.otpService.sendMail(user.email);

            console.log("user Registered Successfully");

            return res.status(201).json({
                success: true,
                data: user,
                accessToken,
                message: "User Registered in successfully",
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error });
        }
    };

    public login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const { user, accessToken, refreshToken } = await this.userService.login(email, password);

            console.log("refresh token :", refreshToken);

            res.cookie("jwtRefresh", refreshToken, {
                httpOnly: true,
                secure: false, // true in production
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
                path: "/", // Ensure cookie is available on all paths
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

    async logout(req: Request, res: Response) {
        res.cookie("jwt-refresh", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({ message: "User logged out" });
    }

    async saveClientDetails(req: Request, res: Response) {
        try {
            const { userId, companyName, companyDescription, projectNeeds, website } = req.body.clientData;
            const savedClientData = await this.userService.saveClientDetail({ userId, companyName, companyDescription, projectNeeds, website } as IClientDetail);
            res.status(201).json(savedClientData);
        } catch (error) {
            console.log("Error in saving Client data:", error);
            return res.status(500).json({ error });
        }
    }

    async saveFreelancerDetails(req: Request, res: Response) {
        try {
            const file = req.file;
            const { userId, title, skills, accounts } = req.body;

            if (!file) {
                return res.status(400).json({ message: "No file uploaded" });
            }
            const savedData = await this.userService.saveFreelancerDetails(file, JSON.parse(userId), title, JSON.parse(skills), JSON.parse(accounts));
            res.json(savedData);
        } catch (error) {
            console.log("Error in saving freelaner data:", error);
            return res.status(500).json({ error });
        }
    }

    async getFreelancerData(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            console.log("userId:", userId);
            const profile = await this.userService.getFreelancerProfile(userId);
            res.status(200).json(profile);
        } catch (error) {
            console.log("Error in fetching profile :", error);
            return res.status(500).json({ message: "Server error", error });
        }
    }

    async getClientData(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            const profile = await this.userService.getClientProfile(userId);
            res.status(200).json(profile);
        } catch (error) {
            console.log("Error in fetching profile :", error);
            return res.status(500).json({ message: "Server error", error });
        }
    }

    async getFreelancers(req: Request, res: Response) {
        try {
            // const { freelancerIds } = req.body;
            const ids = req.query.ids;
            console.log("ids:", ids);
            if (!ids || !Array.isArray(ids)) {
                throw new Error("Invalid or missing 'ids' query parameter");
            }

            const freelancers = await this.userService.getFreelancers(ids as string[]);
            console.log('freeelnacer and user details:',freelancers);
            res.status(200).json(freelancers);

        } catch (error) {
            console.log("Error in fetching freelancers :", error);
            return res.status(500).json({ message: "Server error", error });
        }
    }
}
