import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { IUser } from "@_opportune/common";
import { Document, ObjectId } from "mongoose";
import { inject, injectable } from "inversify";
import { TYPES } from "../../interfaces/types";

@injectable()
export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async isUserBlocked(userId: ObjectId): Promise<boolean | undefined> {
        console.log("user id to check isblock:", userId);
        const user = (await this.userRepository.findById(userId)) as IUser & Document;
        console.log("user:", user);
        return user.isBlocked;
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
                console.log("!!! handling update user in job service !!!!");
                await this.updateUser(data);
                break;
            default:
                console.log(`Unhandled event type: ${eventType}`);
        }
    }
}
