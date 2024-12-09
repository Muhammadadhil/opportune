//service layer contains the business logic ,
//  we can include password hasing,validation etc..

import { UserRepository } from "../../repositories/implementation/UserRepository";
import bcrypt from "bcrypt";
import IUser from "../../interfaces/IUser";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt/generateToken";
import IClientDetail from "../../interfaces/IClientDetail";
import IFreelancer from "../../interfaces/IFreelancer";
import IAccounts from "../../interfaces/IAccounts";
import { uploadTosS3,getSignedImageURL } from "../../utils/Uploads3";
import sharp from "sharp";
import { ObjectId } from "mongoose";
import { ClientRepository } from "../../repositories/implementation/ClientRepository";
import { IFreelancerRepository } from "../../repositories/interfaces/IFreelancerRepository";
import { FreelancerRepository } from "../../repositories/implementation/FreelancerRepository";

export class UserService {
    private userRepository: UserRepository;
    private clientRepository: ClientRepository;
    private freelancerRepository: IFreelancerRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.clientRepository = new ClientRepository();
        this.freelancerRepository= new FreelancerRepository();
    }

    async userExist(email: string): Promise<IUser | null> {
        const user = await this.userRepository.findOne({ email });
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

        const newUser = await this.userRepository.create(userToCreate as IUser);
        console.log("newUser:", newUser);

        const userId: string = newUser._id.toString();
        const role: string = newUser.role;
        const accessToken = generateAccessToken(userId, role);
        const refreshToken = generateRefreshToken(userId, role);

        const { password, ...userWithoutPassword } = newUser.toObject();

        return { user: userWithoutPassword, accessToken, refreshToken };
    }

    async login(email: string, password: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        console.log("user w/o password:", user);

        const isPasswordValid = bcrypt.compareSync(password, user.password ?? "");
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const userId: string = user._id.toString();
        const role: string = user.role;
        const accessToken = generateAccessToken(userId, role);
        const refreshToken = generateRefreshToken(userId, role);

        return { user, accessToken, refreshToken };
    }

    async saveClientDetail(details: IClientDetail) {
        const existClientDetail = await this.clientRepository.findOne({ _id: details.userId });
        if (existClientDetail) {
            throw new Error("Detail already exists");
        }
        return await this.clientRepository.create(details as IClientDetail);
    }

    async getClientProfile(userId: string) {
        const clientDetails = await this.clientRepository.findOne({ userId });

        if (!clientDetails) {
            throw new Error("No details available");
        }

        return clientDetails;
    }

    async saveFreelancerDetails(file: Express.Multer.File, userId: string, title: string, skills: string[], accounts: IAccounts) {
        // const existDetail = await this.freelancerRepository.getFreelancerDetails(userId);
        const existDetail = await this.freelancerRepository.findOne({ userId });

        if (existDetail) {
            throw new Error("Detail already exists");
        }

        const buffer = await sharp(file.buffer).resize({ height: 1080, width: 1080, fit: "contain" }).toBuffer();
        const image = await uploadTosS3(buffer, file.mimetype);

        return await this.freelancerRepository.create({ userId, title, skills, accounts, image } as IFreelancer);
    }

    async getFreelancerProfile(userId: string) {
        const freelancerDetails = await this.freelancerRepository.findOne({ userId });
        console.log("freelancerDetails:", freelancerDetails);
        const imageName = freelancerDetails?.image;

        if (!imageName) {
            throw new Error("No image in database!");
        }

        const imageUrl = await getSignedImageURL(imageName);

        freelancerDetails.imageUrl = imageUrl;
        return freelancerDetails;
    }

    async getFreelancers(ids: string[]) {
        return await this.freelancerRepository.getFreelancersDatas(ids);
    }
}
