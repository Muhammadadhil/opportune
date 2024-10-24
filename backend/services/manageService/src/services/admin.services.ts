import { AdminRepository } from "../repositories/admin.repository";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt/generateToken";

export class AdminService {
    private adminRepository;

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    async login(email: string, password: string) {

        // const bcrypt = require("bcrypt");
        const password1 = "aadhi1234";
        const hash = bcrypt.hashSync(password1, 10);
        console.log("Use this hash in MongoDB:", hash);

        // 1. First, let's log the incoming password
        console.log("Attempting login with password:", password);

        const admin = await this.adminRepository.findAdmin(email);
        if (!admin) {
            throw new Error("Invalid email or password");
        }

        // 2. Log the stored hash from database
        console.log("Stored hash from DB:", admin.password);

        // 3. Let's test the password comparison explicitly
        const isPasswordValid = bcrypt.compareSync(password, admin.password ?? "");
        console.log("Password comparison result:", isPasswordValid);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        console.log(" password  checked !!");

        // const adminId: string = admin._id.toString();
        const adminId: string = "1232342342342342342342432";

        const accessToken = generateAccessToken(adminId, "admin");
        const refreshToken = generateRefreshToken(adminId, "admin");

        return { admin, accessToken, refreshToken };
    }
}
