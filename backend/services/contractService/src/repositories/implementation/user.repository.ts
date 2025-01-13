import { Model } from "mongoose";
import { IUserRepository } from "../interfaces/IUserRepository";
import { BaseRepository } from "./baseRepository";
import { IUser } from '../../entities/UserEntity';

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor(model: Model<IUser>) {
        super(model);
    }
}
