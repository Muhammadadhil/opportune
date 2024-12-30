import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { IUser } from "../../entities/UserEntity";
import { Document, ObjectId } from "mongoose";
import { inject, injectable } from "inversify";
import { TYPES } from "../../interfaces/types";
import axios from "axios";

@injectable()
export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getUsers(page: number, limit: number, searchkey: string): Promise<{ AllUsers: IUser[] | null; totalPagesCount: number }> {
        const totalJobs = await this.userRepository.getUsersCount();
        const AllUsers = await this.userRepository.getUsers(page, limit, searchkey);

        const totalPagesCount = Math.ceil(totalJobs / limit);

        return {
            AllUsers,
            totalPagesCount,
        };
    }

    async toggleBlockStatus(userId: ObjectId): Promise<string> {
        const user = await this.userRepository.toggleBlockStatus(userId);
        if (!user) throw new Error("User not found");

        //adCh1
        await axios.patch(`http://localhost:3015/users/${userId}/block-toggle`);

        return user.isBlocked ? "Blocked" : "Unblocked";

        // publish a message with the event type and the user data;

        
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
