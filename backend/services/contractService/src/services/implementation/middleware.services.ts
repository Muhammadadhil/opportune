// import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
// import { IUser } from "../../entities/UserEntity";
// import { Document, ObjectId } from "mongoose";

// export class MidddlewareService {
//     private _userRepository: IUserRepository;

//     constructor(userRepository: IUserRepository) {
//         this._userRepository = userRepository;
//     }

//     async isUserBlocked(userId: ObjectId): Promise<boolean | undefined> {

//         console.log("user id to check isblock:", userId);
//         const user = await this._userRepository.findById(userId) as IUser & Document;
//         console.log("user:", user);

//         return user.isBlocked;
//     }

    
// }
