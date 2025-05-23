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
    saveFreelancerDetails(image: string, userId: string, title: string, skills: string[], accounts: IAccounts, prefferedJobs: string[]): Promise<IFreelancer>;
    getFreelancerProfile(userId: string): Promise<IFreelancer>;
    getFreelancers(ids: string[]): Promise<IFreelancer[] | IUser[]>;
    updateWallet(userId: string, updatedEscrow: any): void;
    getUserInfo(userId: string | ObjectId, userType: "client" | "freelancer"): Promise<any>;
    generateCVUploadUrl(fileName: string, fileType: string): Promise<{ url: string; fileKey: string }>;
    saveCVDetails(userId: string, fileKey: string, fileName: string, fileType: string): Promise<IFreelancer | null> 
    getCVUrl(userId: string): Promise<{ cvs: Array<{ url: string, cvDetails: any }> }>
}
