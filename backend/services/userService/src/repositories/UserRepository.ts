
import { User } from "../schema/User";
import IUser from "../interfaces/IUser";

export class UserRepository {
    async createUser(userData: IUser): Promise<IUser> {

        console.log('userData repo:',userData);
        const user = new User(userData);
        console.log('user:',user)
        return await user.save();
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        console.log("!!!find user Repo");

        return await User.findOne({ email }).lean(); // lean() will avoid the unwanted fields in mongoose doc
    }

    async changeVerifiedStatus(email:string,status:boolean){
        return await User.findOneAndUpdate({ email }, { $set: { isVerified :true} });
    }

}
