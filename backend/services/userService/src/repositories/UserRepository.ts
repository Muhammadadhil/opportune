import { User } from "../schema/User";
import { ClientDetail } from "../schema/ ClientDetails";
import { FreelancerDetails } from "../schema/FreelancerDetails";
import IUser from "../interfaces/IUser";
import IClientDetail from "../interfaces/IClientDetail";
import IFreelancer from "../interfaces/IFreelancer";
import { ObjectId } from "mongoose";


export class UserRepository {

    async createUser(userData: IUser): Promise<IUser> {
        const user = new User(userData);
        return await user.save();
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).lean(); // lean() will avoid the unwanted fields in mongoose doc
    }

    async changeVerifiedStatus(email: string, status: boolean) {
        return await User.findOneAndUpdate({ email }, { $set: { isVerified: true } });
    }

    async saveClientDetails(details: IClientDetail) {
        const newClient = new ClientDetail(details);
        return await newClient.save();
    }

    
    async saveFreelancerData(details: IFreelancer) {
        const newFreelancer = new FreelancerDetails(details);
        return await newFreelancer.save();
    }

    async getFreelancerDetails(userId: string): Promise<IFreelancer | null> {
        const freelancerData = await FreelancerDetails.findOne({ userId }).lean();

        if (!freelancerData) {
            return null;
        }

        const freelancer: IFreelancer = {
            userId: freelancerData.userId as string,
            title: freelancerData.title as string,
            skills: freelancerData.skills as string[],
            accounts: freelancerData.accounts as { linkedin: string; github: string; other: string },
            image: freelancerData.image as string,
        };

        return freelancer;
    }
    
    async findClientDetail(userId: ObjectId | string) {
        const data= await ClientDetail.findOne({userId });
        console.log('client data:',data)

        if(!data){
            return null;
        }
        
        const client = {
            companyName: data.companyName,
            companyDescription: data.companyDescription,
            projectNeeds: data.projectNeeds,
            website:data.website
        };
        return client;
    }
}
