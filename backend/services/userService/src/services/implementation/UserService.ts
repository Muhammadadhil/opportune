import { UserRepository } from "../../repositories/implementation/UserRepository";
import bcrypt from "bcrypt";
import IUser from "../../interfaces/IUser";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt/generateToken";
import IClientDetail from "../../interfaces/IClientDetail";
import IFreelancer from "../../interfaces/IFreelancer";
import IAccounts from "../../interfaces/IAccounts";
import { FileUploader } from "../../utils/fileUploader";
import sharp from "sharp";
import { ObjectId } from "mongoose";
import { ClientRepository } from "../../repositories/implementation/ClientRepository";
import { IFreelancerRepository } from "../../repositories/interfaces/IFreelancerRepository";
import { FreelancerRepository } from "../../repositories/implementation/FreelancerRepository";
import { LoginUserResponse, RegisterUserResponse } from "../../interfaces/IAuthResponse";
import IUserService from "../interfaces/IUserService";
import { RabbitMQProducer } from "../../events/rabbitmq/producer";
import { Unauthorised } from "@_opportune/common";
import { FreelancerResponseDTO } from "../../dto/user/user-response.dto";

export class UserService implements IUserService {
    private userRepository: UserRepository;
    private clientRepository: ClientRepository;
    private freelancerRepository: IFreelancerRepository;
    private fileUploader: FileUploader;

    private producer;

    constructor() {
        this.userRepository = new UserRepository();
        this.clientRepository = new ClientRepository();
        this.freelancerRepository = new FreelancerRepository();
        this.producer = new RabbitMQProducer();
        this.intialize();
        this.fileUploader = new FileUploader();
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

        if (user?.isBlocked) {
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

    async generatePresignedUrl(fileName: string, fileType: string): Promise<{ url: string; fileKey: string }> {
        return this.fileUploader.generateUploadPresignedUrl(fileName, fileType);
    }

    async saveFreelancerDetails(image: string, userId: string, title: string, skills: string[], accounts: IAccounts, prefferedJobs: string[]) {
        const existDetail = await this.freelancerRepository.findOne({ userId });

        if (existDetail) {
            throw new Error("Detail already exists");
        }

        return await this.freelancerRepository.create({ userId, title, skills, accounts, image, prefferedJobs } as IFreelancer);
    }

    async getFreelancerProfile(userId: string): Promise<IFreelancer> {
        let freelancerDetails = await this.freelancerRepository.findOne({ userId });
        const imageName = freelancerDetails?.image;

        if (!imageName) {
            throw new Error("No image in database!");
        }

        const imageUrl = await this.fileUploader.generateDownloadPresignedUrl(imageName);

        const result = {
            accounts: freelancerDetails.accounts,
            _id: freelancerDetails._id,
            userId: freelancerDetails.userId,
            title: freelancerDetails.title,
            skills: freelancerDetails.skills,
            image: freelancerDetails.image,
            prefferedJobs: freelancerDetails.prefferedJobs,
            imageUrl: imageUrl,
        };

        console.log("freelancer detailsss  result:", result);

        return result as IFreelancer;
    }

    async getFreelancers(ids: string[]): Promise<IFreelancer[] | IUser[]> {
        return await this.freelancerRepository.getFreelancersDatas(ids);
    }

    async toggleBlockStatus(userId: ObjectId) {
        const user = await this.userRepository.toggleBlockStatus(userId);
        if (!user) throw new Error("User not found");

        this.producer.publishToMultiple("user_exchange", user, "update");

        return user.isBlocked ? "Blocked" : "Unblocked";
    }

    async editProfile(userId: string, data: Partial<IUser>) {
        console.log("updating user data Serviccceee:", userId, data);

        const user = await this.userRepository.updateById(userId, data);
        this.producer.publishToMultiple("user_exchange", user, "update");

        return user;
    }

    async updateFreelancerDetails(userId: string, data: Partial<IFreelancer>) {
        return await this.freelancerRepository.update(userId, data);
    }

    async updateClientDetails(userId: string, data: Partial<IClientDetail>) {
        return await this.clientRepository.update(userId, data);
    }

    async updateWallet(userId: string, updatedEscrow: any) {
        const user = await this.userRepository.updateUserWallet(userId, updatedEscrow.amount, updatedEscrow.description, updatedEscrow.paymentId);
        this.producer.publishToMultiple("user_exchange", user, "update");
        return user;
    }

    async getUserDetails(userId: string) {
        return await this.userRepository.findById(userId);
    }

    async getUserInfo(userId: string | ObjectId) {
        const userData = await this.userRepository.findById(userId as string);

        if (userData && userData.role === "freelancer") {
            const freelancerData = await this.userRepository.findUserWithFreelancerDetails(userId);
            if (freelancerData && freelancerData.freelancerDetails) {
                freelancerData.freelancerDetails.imageUrl = await this.fileUploader.generateDownloadPresignedUrl(freelancerData.freelancerDetails.image);
            }
            console.log("freelancerData:", freelancerData);

            // const responseDTO: FreelancerResponseDTO = {
            //     _id: freelancerData?._id.toString() || ,
            //     firstname: freelancerData?.firstname || "",
            //     lastname: freelancerData?.lastname || "",
            //     email: freelancerData?.email || "",
            //     country: freelancerData?.country || "",
            //     role: freelancerData?.role || "",
            //     isVerified: freelancerData?.isVerified || false,
            //     isBlocked: freelancerData?.isBlocked || false,
            //     averageRating: freelancerData?.averageRating || 0,
            //     reviewCount: freelancerData?.reviewCount || 0,
            //     freelancerDetails: freelancerData?.freelancerDetails
            //         ? {
            //               _id: freelancerData?.freelancerDetails._id.toString(),
            //               userId: freelancerData?.freelancerDetails.userId.toString(), // Convert ObjectId to string
            //               title: freelancerData?.freelancerDetails.title || "",
            //               skills: freelancerData?.freelancerDetails.skills || [],
            //               accounts: freelancerData?.freelancerDetails.accounts || {
            //                   linkedin: "",
            //                   github: "",
            //                   other: "",
            //               },
            //               imageUrl: freelancerData?.freelancerDetails.imageUrl || "",
            //               prefferedJobs: freelancerData?.freelancerDetails.prefferedJobs || [],
            //           }
            //         : undefined,
            // };

            // return responseDTO;

            //  const { walletAmount, walletHistory, ...userDataWithoutWallet } = freelancerData;
            //  return userDataWithoutWallet;
            return freelancerData;
            
        } else if (userData && userData.role === "client") {
            const clientData = await this.userRepository.findUserWithClientDetails(userId);
            return clientData ? clientData.toObject() : null;
        }

        throw new Error("User not found");
    }

    async getAllFreelancersDetails() {
        const freelancers = await this.freelancerRepository.find();
        const freelancerDetails = await Promise.all(
            freelancers.map(async (freelancer) => {
                const userInfo = await this.userRepository.findById(freelancer.userId as string);
                const imageUrl = await this.fileUploader.generateDownloadPresignedUrl(freelancer.image);

                return {
                    freelancerDetails: {
                        ...freelancer.toObject(),
                        imageUrl: imageUrl,
                    },
                    userInfo: userInfo ? userInfo.toObject() : null,
                };
            })
        );
        return freelancerDetails;
    }
}
