import { Model } from "mongoose";
import { IUserRepository } from "../interface/IUserRepository";
import { BaseRepository } from "./base.repository";
import { IUser } from '../../entities/UserEntity';
import { inject, injectable } from "inversify";

@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    private userModel: Model<IUser>;
    constructor(@inject("UserModel") model: Model<IUser>) {
        super(model);
        this.userModel = model;
    }

    async getUsersCount(): Promise<number> {
        return await this.userModel.countDocuments().exec();
    }

    async getUsers(page: number, limit: number, searchkey: string): Promise<IUser[]> {
        const skip = (page - 1) * limit;
        if (searchkey) {
            return await this.userModel
                .find({
                    $or: [{ firstname: { $regex: searchkey, $options: "i" } }, { lastname: { $regex: searchkey, $options: "i" } }, { email: { $regex: searchkey, $options: "i" } }],
                })
                .skip(skip)
                .limit(limit)
                .exec();
        } else {
            return await this.userModel.find().skip(skip).limit(limit).exec();
        }
    }
}
