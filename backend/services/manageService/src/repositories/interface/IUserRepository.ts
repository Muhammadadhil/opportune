import { ObjectId } from "mongoose";
import { IUser } from "../../entities/UserEntity";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserRepository extends IBaseRepository<IUser> {
    getUsersCount(): Promise<number>;
    getUsers(page: number, limit: number, searchkey: string): Promise<IUser[]>;
    toggleBlockStatus(userId: ObjectId): Promise<IUser | null>;
}
