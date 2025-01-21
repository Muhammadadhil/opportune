import { AdminRepository } from "../../repositories/implementation/admin.repository";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken";
import { IAdminService } from "../interfaces/IAdminService";
import axios from "axios";
import { EscrowStatus } from "../../enums/EscrowStatus";
import { UserService } from "./user.services";
import { UserRepository } from "../../repositories/implementation/user.repository";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { User } from "../../schema/user.schema";



export class AdminService implements IAdminService {
    private adminRepository;
    private userService: UserService;

    constructor() {
        this.adminRepository = new AdminRepository();
        this.userService = new UserService(new UserRepository(User));
    }

    async login(email: string, password: string) {
        // email muhammadadhil934@gmail.com
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

    async getDashboardData() {  
        
       try {

            //adCh1
             const response = await axios.get("http://localhost:3020/jobs");
            //  console.log("response", response.data);

             const activeOpenJobs = response?.data?.jobs?.filter((job:any) => job.isActive === true && job.status === "open").length;

             const escrowResponse = await axios.get("http://localhost:3040/escrow/paymensts");
            //  console.log("escrowResponse", escrowResponse.data);

             const totalEscrowAmount = escrowResponse?.data?.reduce((total: number, escrow: any) => {
                 if (escrow.status === EscrowStatus.HOLDING) {
                     return total + escrow.amount;
                 }
                 return total;
             }, 0);

             const { freelacerCount, clientsCount } = await this.userService.getUserCountByRole();

             return {
                 totalOpenJobs: response.data?.jobs?.filter((job: any) => job.isActive === true).length,
                 totalClosedJobs: response.data?.jobs?.filter((job: any) => job.isActive === false).length,
                 totalOpenEscrow: escrowResponse?.data?.filter((escrow: any) => escrow.status === EscrowStatus.HOLDING).length,
                 totalClosedEscrow: escrowResponse?.data?.filter((escrow: any) => escrow.status === EscrowStatus.RELEASED).length,
                 totalEscrowAmount: totalEscrowAmount,
                 activeOpenJobs: activeOpenJobs,
                 freelacerCount,
                 clientsCount
             };

        


       } catch (error) {
            console.log('error in getDashboardData:',error)
       }
    }
}
