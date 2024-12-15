import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { IUser } from "../../entities/UserEntity";
import { Document } from "mongoose";
import { inject, injectable } from "inversify";
import { TYPES } from "../../interfaces/types";

@injectable()
export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getUsers(page: number, limit: number, searchkey: string): Promise<{ AllUsers: IUser[] | null; totalPagesCount: number }>{
    
        const totalJobs = await this.userRepository.getUsersCount();
        const AllUsers = await this.userRepository.getUsers(page, limit, searchkey);

        const totalPagesCount = Math.ceil(totalJobs / limit);

        return {
            AllUsers,
            totalPagesCount,
        };
    }

    async createUser(data: IUser): Promise<void> {
        await this.userRepository.create(data);
    }

    async updateUser(data: IUser & Document): Promise<void> {
        await this.userRepository.update(data._id, data);
    }

    async handleEvent(eventType: string, data: any): Promise<void> {
        switch (eventType) {
            case "create":
                await this.createUser(data);
                break;
            case "update":
                await this.updateUser(data);
                break;
            default:
                console.log(`Unhandled event type: ${eventType}`);
        }
    }
}
