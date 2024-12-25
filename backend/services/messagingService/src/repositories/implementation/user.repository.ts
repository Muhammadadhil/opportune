import { Model } from "mongoose";
import { IUserRepository } from "../interfaces/IUserRepository";
import { BaseRepository } from "./baseRepository";
import { IUser } from '@_opportune/common';
import { inject, injectable } from "inversify";
import { User } from "../../schema/user.schema";

@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(User);
    }
}
