import { Request, Response,NextFunction } from "express";
import { AdminService } from "../../services/implementation/admin.services";

export class AdminController {
    private adminService: AdminService;

    constructor() {
        this.adminService = new AdminService();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getDashboardData = this.getDashboardData.bind(this);

    }
    async login(req: Request, res: Response) {
        try {

            console.log("admin login !!!");

            const { email, password } = req.body;
            const { admin, accessToken, refreshToken } = await this.adminService.login(email, password);

            res.cookie("jwtRefresh", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: "/", 
            });

            console.log("admin login Successfully");

            return res.status(201).json({
                success: true,
                data: admin,
                accessToken,
                message: "admin logged in successfully",
            });
        } catch (error: any) { 
            console.log('error:',error);

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

        res.status(200).json({ message: "Admin logged Out Successfully" });
    }

    async getDashboardData(req: Request, res: Response,next:NextFunction){
        try {
            const dashboardData = await this.adminService.getDashboardData();
            res.status(200).json(dashboardData);
        } catch (error) {
            next(error);
        }


    }
}
