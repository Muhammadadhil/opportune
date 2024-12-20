import { AdminRepository } from "../../repositories/implementation/admin.repository";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken";
import { IAdminService } from "../interfaces/IAdminService";

export class AdminService implements IAdminService {
    private adminRepository;

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    async login(email: string, password: string) {
        // gmail
        // const password1 = "aadhi1234";
        // const hash = bcrypt.hashSync(password1, 10);
        // console.log("Use this hash in MongoDB:", hash);

        const admin = await this.adminRepository.findAdmin(email);
        if (!admin) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = bcrypt.compareSync(password, admin.password ?? "");

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const accessToken = generateAccessToken(admin._id as string, "admin");
        const refreshToken = generateRefreshToken(admin._id as string, "admin");

        return { admin, accessToken, refreshToken };
    }
}
