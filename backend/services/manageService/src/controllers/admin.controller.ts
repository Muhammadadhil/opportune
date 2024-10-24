import { Request, Response,NextFunction } from "express";
import { AdminService } from "../services/admin.services";
import Admin from "../schema/admin.schema";

export class AdminController {
    private adminService:AdminService

    constructor() {
        this.adminService = new AdminService();
        this.login = this.login.bind(this);
    }
    async login(req: Request, res: Response) {
        try {

            const { email, password } = req.body;
            const { admin, accessToken, refreshToken } = await this.adminService.login(email, password);

            console.log("refresh token :", refreshToken);

            res.cookie("jwtRefresh", refreshToken, {
                httpOnly: true,
                secure: false, // true in production
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: "/", // Ensure cookie is available on all paths
            });

            console.log("user login Successfully");

            return res.status(201).json({
                success: true,
                data: admin,
                accessToken,
                message: "admin logged in successfully",
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
