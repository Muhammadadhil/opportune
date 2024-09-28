// This layer interacts with the database directly. It will contain methods for data manipulation like create, find, etc.

import { User } from "../schema/User";
import IUser from "../interfaces/IUser";

export class UserRepository {
    async createUser(userData: IUser): Promise<IUser> {
        const user = new User(userData);
        return await user.save();
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        console.log("!!!find user Repo");

        return await User.findOne({ email }).lean(); // lean() will avoid the unwanted fields in mongoose doc
    }
}
