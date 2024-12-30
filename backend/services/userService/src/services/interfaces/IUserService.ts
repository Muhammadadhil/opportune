import { ObjectId } from "mongoose";
import IAccounts from "../../interfaces/IAccounts";
import { LoginUserResponse, RegisterUserResponse } from "../../interfaces/IAuthResponse";
import IClientDetail from "../../interfaces/IClientDetail";
import IFreelancer from "../../interfaces/IFreelancer";
import IUser from "../../interfaces/IUser";


export default interface IUserService {
    registerUser(userData: IUser): RegisterUserResponse;
    login(email: string, password: string): LoginUserResponse;
    saveClientDetail(details: IClientDetail): Promise<IClientDetail>;
    getClientProfile(userId: string): Promise<IClientDetail>;
    saveFreelancerDetails(file: Express.Multer.File, userId: string, title: string, skills: string[], accounts: IAccounts): Promise<IFreelancer>;
    getFreelancerProfile(userId: string): Promise<IFreelancer>;
    getFreelancers(ids: string[]): Promise<IFreelancer[] | IUser[]>;
    updateWallet(userId: string, updatedEscrow: any): void;
    getUserInfo(userId: string | ObjectId, userType: "client" | "freelancer"):Promise<any>;
}