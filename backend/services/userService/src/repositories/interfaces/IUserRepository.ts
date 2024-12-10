import { IBaseRepository } from "./IRepository";
import IUser from "../../interfaces/IUser";

export interface IUserRepository extends IBaseRepository<IUser> {
    changeVerifiedStatus(email: string, status: boolean): Promise<IUser | null>;
}
