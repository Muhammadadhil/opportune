//service layer contains the business logic ,
//  we can include password hasing,validation etc..

import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import IUser from "../interfaces/IUser";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt/generateToken";
import IClientDetail from "../interfaces/IClientDetail";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async userExist(email: string): Promise<IUser | null> {
        console.log("userExist in repository");

        const user = await this.userRepository.findUserByEmail(email);
        if (user) {
            return user;
        }
        return null;
    }

    async registerUser(userData: IUser): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        console.log("Register user service");
        console.log("register user Serive: userData:", userData);

        const hashedPassword = await bcrypt.hash(userData.password ?? "", 10);
        const userToCreate = { ...userData, password: hashedPassword };

        const newUser = await this.userRepository.createUser(userToCreate as IUser);
        console.log("newUser:", newUser);

        const userId: string = newUser._id.toString();
        const role: string = newUser.role;
        const accessToken = generateAccessToken(userId, role);
        const refreshToken = generateRefreshToken(userId, role);

        const { password, ...userWithoutPassword } = newUser.toObject();

        return { user: userWithoutPassword, accessToken, refreshToken };
    }

    async login(email: string, password: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }

        console.log("user w/o password:", user);

        console.log("checking password!!");
        const isPasswordValid = bcrypt.compareSync(password, user.password ?? "");
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        console.log(" password  checked !!");

        const userId: string = user._id.toString();
        const role: string = user.role;
        const accessToken = generateAccessToken(userId, role);
        const refreshToken = generateRefreshToken(userId, role);

        return { user, accessToken, refreshToken };
    }

    async clientDetail(details: IClientDetail){
        console.log('client details in serivce:',details);
        return await this.userRepository.saveClientDetails(details as IClientDetail);

    };
}
