//The controller handles the HTTP request and interacts with the service layer.

import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/implementation/UserService";
import { OtpService } from "../services/implementation/OtpService";
import IClientDetail from "../interfaces/IClientDetail";
import { ObjectId, Types } from "mongoose";

export class UserController {
    private userService: UserService;
    private otpService: OtpService;

    constructor() {
        this.userService = new UserService();
        this.otpService = new OtpService();
        this.registerUser = this.registerUser.bind(this);
        this.login = this.login.bind(this);
        this.saveClientDetails = this.saveClientDetails.bind(this);
        this.saveFreelancerDetails = this.saveFreelancerDetails.bind(this);
        this.getFreelancerData = this.getFreelancerData.bind(this);
        this.getClientData = this.getClientData.bind(this);
        this.getFreelancers = this.getFreelancers.bind(this);
        this.toggleBlockStatus = this.toggleBlockStatus.bind(this);
        this.editUserProfile = this.editUserProfile.bind(this);
        this.updateWallet = this.updateWallet.bind(this);
        this.generatePresignedUrl = this.generatePresignedUrl.bind(this);
        this.getAllFreelancersDetails = this.getAllFreelancersDetails.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
        this.generateCVUploadUrl = this.generateCVUploadUrl.bind(this);
        this.saveCVDetails = this.saveCVDetails.bind(this);
        this.getCVUrl = this.getCVUrl.bind(this);
    }

    async registerUser(req: Request, res: Response) {
        try {
            const response = await this.userService.registerUser(req.body.formData);
            if (!response.success) {
                return res.status(400).json({ message: response.message });
            }

            const { user, accessToken, refreshToken } = response;

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
            console.log("Error in registering user:", error);
            return res.status(500).json({ message: "Server error", error });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const { user, accessToken, refreshToken } = await this.userService.login(email, password);

            console.log("refresh token :", refreshToken);

            res.cookie("jwtRefresh", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
                path: "/", 
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
    }

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

    async generatePresignedUrl(req: Request, res: Response, next: NextFunction) {
        try {
            const { fileName, fileType } = req.body;
            const { url, fileKey } = await this.userService.generatePresignedUrl(fileName, fileType);
            return res.status(200).json({ url, fileKey });
        } catch (error) {
            console.log("Error in generating presigned URL:", error);
            next(error);
        }
    }

    async saveFreelancerDetails(req: Request, res: Response) {
        try {
            const { userId, title, skills, accounts, image, prefferedJobs } = req.body;

            console.log("complete profile req. body:", req.body);
            const savedData = await this.userService.saveFreelancerDetails(image, userId, title, skills, accounts, prefferedJobs);
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
            const ids = req.query.ids;

            if (!ids || !Array.isArray(ids)) {
                throw new Error("Invalid or missing 'ids' query parameter");
            }

            const freelancers = await this.userService.getFreelancers(ids as string[]);
            res.status(200).json(freelancers);
        } catch (error) {
            return res.status(500).json({ message: "Server error", error });
        }
    }

    // block user call from admin
    async toggleBlockStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.userId;
            const userId = new Types.ObjectId(id);

            if (!userId) {
                res.status(400).json({ message: "Invalid input" });
                return;
            }
            const message = await this.userService.toggleBlockStatus(userId as unknown as ObjectId);
            res.status(200).json({ message });
        } catch (error) {
            next(error);
        }
    }

    async editUserProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { userData, roleSpecificData } = req.body;

            // Update basic user data
            const updatedUser = await this.userService.editProfile(userId, userData);

            // Update role-specific data if provided
            if (roleSpecificData && updatedUser) {
                if (updatedUser.role === "freelancer") {
                    await this.userService.updateFreelancerDetails(userId, roleSpecificData);
                } else if (updatedUser.role === "client") {
                    await this.userService.updateClientDetails(userId, roleSpecificData);
                }
            }

            res.status(200).json({ updatedUser, roleSpecificData });
        } catch (error) {
            next(error);
        }
    }

    async getUserDetails(req: Request, res: Response, next: NextFunction){
        try {
            const { userId } = req.params;
            const user = await this.userService.getUserDetails(userId);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("getting user info in user service !!");

            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({
                    status: "error",
                    message: "User ID and type are required",
                });
            }

            const userData = await this.userService.getUserInfo(userId);

            return res.status(200).json({
                status: "success",
                data: userData,
            });
        } catch (error: any) {
            next(error);
        }
    };

    async updateWallet(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("updating wallet in user service !!");

            const updatedEscrow = req.body;
            const userId = req.params.userId;

            console.log("updating wallet id, formdata", userId, updatedEscrow);
            const profile = await this.userService.updateWallet(userId, updatedEscrow);
            res.status(200).json(profile);
        } catch (error) {
            console.log("Error in updating wallet :", error);
            next(error);
        }
    }

    async getAllFreelancersDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const freelancers = await this.userService.getAllFreelancersDetails();
            res.status(200).json(freelancers);
        } catch (error) {
            next(error);
        }
    }

    async generateCVUploadUrl(req: Request, res: Response ,next: NextFunction) {
        try {
            const { fileName, fileType } = req.body;

            if (!fileName || !fileType) {
                return res.status(400).json({ message: "fileName and fileType are required" });
            }

            const uploadData = await this.userService.generateCVUploadUrl(fileName, fileType);
            res.status(200).json(uploadData);
        } catch (error) {
            console.log("Error generating CV upload URL:", error);
            next(error);
        }
    }

    async saveCVDetails(req: Request, res: Response , next: NextFunction) {
        try {
            const { userId } = req.params;
            const { cvKey, fileName, fileType } = req.body;

            console.log("saveCVDetails req.params:", req.params);
            console.log("saveCVDetails req.body:", req.body);   
            if (!cvKey || !fileName || !fileType) {
                return res.status(400).json({ message: "cvKey, fileName, and fileType are required" });
            }

            const savedData = await this.userService.saveCVDetails(userId, cvKey, fileName, fileType);
            res.status(200).json(savedData);
        } catch (error) {
            console.log("Error saving CV details:", error);
            next(error);
        }
    }

    async getCVUrl(req: Request, res: Response ,next: NextFunction) {
        try {
            const { userId } = req.params;
            const cv = await this.userService.getCVUrl(userId);
            res.status(200).json(cv);
        } catch (error) {
            console.log("Error getting CV URL:", error);
            next(error);
        }
    }
}


