//service layer contains the business logic ,
//  we can include password hasing,validation etc..

import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { IUser } from "../models/User";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async registerUser(userData: IUser): Promise<IUser | string> {
        const existingUser=await this.userRepository.findUserByEmail(userData.email);

        if(existingUser){
            return 'User already exists';
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const userToCreate = { ...userData, password: hashedPassword };
        
        console.log("userToCreate:", userToCreate);
        return await this.userRepository.createUser(userToCreate as IUser)
    }
}
