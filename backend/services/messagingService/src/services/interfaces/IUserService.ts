import { ObjectId } from "mongoose";
import { IUser } from "@_opportune/common";

export interface IUserService {
    isUserBlocked(userId: ObjectId): Promise<boolean | undefined>;
    createUser(data: IUser): Promise<void>;
    updateUser(data: IUser & Document): Promise<void>;
    handleEvent(eventType: string, data: any): Promise<void>;
}
