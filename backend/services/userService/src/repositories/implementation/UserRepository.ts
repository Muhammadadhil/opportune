import { User } from "../../schema/User";
import IUser from "../../interfaces/IUser";
import { BaseRepository } from "./Repository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ObjectId } from "mongoose";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(User);
    }

    async changeVerifiedStatus(email: string, status: boolean) {
        return await User.findOneAndUpdate({ email }, { $set: { isVerified: true } });
    }

    async toggleBlockStatus(userId: ObjectId): Promise<IUser | null> {
        const user = await User.findOne({ _id: userId });
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set: { isBlocked: !user?.isBlocked } }, { new: true });

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    }
}
