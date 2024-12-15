import { Model } from "mongoose";
import { IUserRepository } from "../interfaces/IUserRepository";
import { BaseRepository } from "./baseRepository";
import { IUser } from '../../entities/UserEntity';
import { inject, injectable } from "inversify";

@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor(@inject("UserModel") model: Model<IUser>) {
        super(model);
    }
}
