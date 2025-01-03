import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { IUser } from "../../entities/UserEntity";
import { Document, ObjectId } from "mongoose";
import { IReview } from "../../schema/review.schema";
import { IReviewRepository } from "../../repositories/interfaces/IReviewRepository";
import axios from "axios";

export class UserService implements IUserService {
    private _userRepository: IUserRepository;
    private _reviewRepository: IReviewRepository;

    constructor(userRepository: IUserRepository, reviewRepository: IReviewRepository) {
        this._userRepository = userRepository;
        this._reviewRepository = reviewRepository;
    }

    async isUserBlocked(userId: ObjectId): Promise<boolean | undefined> {
        console.log("user id to check isblock:", userId);
        const user = (await this._userRepository.findById(userId)) as IUser & Document;
        console.log("user:", user);
        return user.isBlocked;
    }

    async createUser(data: IUser): Promise<void> {
        await this._userRepository.create(data);
    }

    async updateUser(data: IUser & Document): Promise<void> {
        await this._userRepository.update(data._id, data);
    }

    async updateUserRating(userId: ObjectId): Promise<void> {
        const reviews = await this._reviewRepository.getReviewsForUser(userId);
        const averageRating = reviews.reduce((acc:number, review:IReview) => acc + review.rating, 0) / reviews.length;
        
        const reviewCount = reviews.length;

        console.log('avg Rating and reviewsCount:',{ averageRating, reviewCount });

        // Update user profile
        const updatedUser = await this._userRepository.update(userId as unknown as ObjectId, { averageRating, reviewCount });
        console.log('updated user:',updatedUser);

        //adCh1
        await axios.post(`http://localhost:3015/average-rating/add/${updatedUser?._id}`, { userData:updatedUser });

    }

    async handleEvent(eventType: string, data: any): Promise<void> {
        switch (eventType) {
            case "create":
                await this.createUser(data);
                break;
            case "update":
                // console.log(" !!! handling update user in contract service !!!!");
                await this.updateUser(data);
                break;
            default:
                console.log(`Unhandled event type: ${eventType}`);
        }
    }
}
