import { IUser } from "../../entities/UserEntity";

export interface IUserService {
    createUser(data: IUser): Promise<void>;
    updateUser(data: IUser & Document): Promise<void>;
    handleEvent(eventType: string, data: any): Promise<void>;
}
