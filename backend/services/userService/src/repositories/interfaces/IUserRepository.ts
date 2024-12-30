import { IBaseRepository } from "./IRepository";
import IUser from "../../interfaces/IUser";
import { ObjectId } from "mongoose";

export interface IUserRepository extends IBaseRepository<IUser> {
    changeVerifiedStatus(email: string, status: boolean): Promise<IUser | null>;
    toggleBlockStatus(userId: ObjectId): Promise<IUser | null>;
    updateUserWallet(userId: string, amount: number, description: string, paymentId: ObjectId): Promise<IUser>;
}
