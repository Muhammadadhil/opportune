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
import { LoginUserResponse, RegisterUserResponse } from '../../interfaces/IAuthResponse';
import IUserService from "../interfaces/IUserService";
import { RabbitMQProducer } from "../../events/rabbitmq/producer";
import { Unauthorised } from "@_opportune/common";

export class UserService implements IUserService {
    private userRepository: UserRepository;
    private clientRepository: ClientRepository;
    private freelancerRepository: IFreelancerRepository;
    private producer;

    constructor() {
        this.userRepository = new UserRepository();
        this.clientRepository = new ClientRepository();
        this.freelancerRepository = new FreelancerRepository();
        this.producer = new RabbitMQProducer();
        this.intialize();
    }

    async intialize() {
        await this.producer.connect();
    }

    async registerUser(userData: IUser): RegisterUserResponse {
        const user = await this.userRepository.findOne({ email: userData.email });
        if (user) {
            return { success: false, message: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(userData.password ?? "", 10);
        const userToCreate = { ...userData, password: hashedPassword };

        const newUser = await this.userRepository.create(userToCreate as IUser);

        this.producer.publishToMultiple("user_exchange", newUser, "create");

        const userId: string = newUser._id.toString();
        const role: string = newUser.role;
        const accessToken = generateAccessToken(userId, role);
        const refreshToken = generateRefreshToken(userId, role);

        const { password, ...userWithoutPassword } = newUser.toObject();

        return { success: true, user: userWithoutPassword, accessToken, refreshToken };
    }

    async login(email: string, password: string): LoginUserResponse {
        const user = await this.userRepository.findOne({ email });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        if (user?.isBlocked){
            throw new Unauthorised("User is blocked");
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

    async saveClientDetail(details: IClientDetail): Promise<IClientDetail> {
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

        console.log('imageRul: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1',imageUrl)

        freelancerDetails.imageUrl = imageUrl;
        return freelancerDetails;
    }

    async getFreelancers(ids: string[]): Promise<IFreelancer[] | IUser[]> {
        return await this.freelancerRepository.getFreelancersDatas(ids);
    }

    async toggleBlockStatus(userId:ObjectId) {
        
        const user = await this.userRepository.toggleBlockStatus(userId);
        if (!user) throw new Error("User not found");

        this.producer.publishToMultiple("user_exchange", user, "update");
        
        return user.isBlocked ? "Blocked" : "Unblocked";
    }

    async editProfile(userId: string, data: Partial<IUser>) {
        const user = await this.userRepository.update(userId, data);
        this.producer.publishToMultiple("user_exchange", user, "update");

        return user;
    }
}
