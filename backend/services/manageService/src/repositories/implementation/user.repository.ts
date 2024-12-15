import { Model } from "mongoose";
import { IUserRepository } from "../interface/IUserRepository";
import { BaseRepository } from "./base.repository";
import { IUser } from '../../entities/UserEntity';
import { inject, injectable } from "inversify";

@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor(@inject("UserModel") model: Model<IUser>) {
        super(model);
    }
}
