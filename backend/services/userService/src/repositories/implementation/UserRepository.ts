import { User } from "../../schema/User";
import IUser from "../../interfaces/IUser";
import { BaseRepository } from "./Repository";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository{
    constructor() {
        super(User);
    }

    async changeVerifiedStatus(email: string, status: boolean) {
        return await User.findOneAndUpdate({ email }, { $set: { isVerified: true } });
    }

}
