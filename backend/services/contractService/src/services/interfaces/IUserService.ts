import { ObjectId } from "mongoose";
import { IUser } from "../../entities/UserEntity";
import { IReview } from "../../schema/review.schema";

export interface IUserService {
    isUserBlocked(userId: ObjectId): Promise<boolean | undefined>;
    createUser(data: IUser): Promise<void>;
    updateUser(data: IUser & Document): Promise<void>;
    handleEvent(eventType: string, data: any): Promise<void>;
    updateUserRating(userId: ObjectId): Promise<void>;
}
