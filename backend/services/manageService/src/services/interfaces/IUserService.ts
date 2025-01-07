import { ObjectId } from "mongoose";
import { IUser } from "../../entities/UserEntity";

export interface IUserService {
    getUsers(page: number, limit: number, searchkey?: string): Promise<{ AllUsers: IUser[] | null; totalPagesCount: number }>;
    toggleBlockStatus(userId: ObjectId): Promise<string>;
    createUser(data: IUser): Promise<void>;
    updateUser(data: IUser & Document): Promise<void>;
    handleEvent(eventType: string, data: any): Promise<void>;
    getUsersCount(): Promise<number>;
}
