import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { IUser } from "../../entities/UserEntity";
import { Document, ObjectId } from "mongoose";

export class UserService implements IUserService {
    private _userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async isUserBlocked(userId: ObjectId): Promise<boolean | undefined> {
        console.log("user id to check isblock:", userId);
        const user = (await this._userRepository.findById(userId)) as IUser & Document;
        console.log("user:", user);
        return user.isBlocked;
    }

    async createUser(data: IUser): Promise<void> {
        await this._userRepository.create(data);
    }

    async updateUser(data: IUser & Document): Promise<void> {
        await this._userRepository.update(data._id, data);
    }

    async handleEvent(eventType: string, data: any): Promise<void> {
        switch (eventType) {
            case "create":
                await this.createUser(data);
                break;
            case "update":
                console.log(' !!! handling update user in contract service !!!!')
                await this.updateUser(data);
                break;
            default:
                console.log(`Unhandled event type: ${eventType}`);
        }
    }
}
