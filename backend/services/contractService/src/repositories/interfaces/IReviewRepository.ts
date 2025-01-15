import { ObjectId } from "mongoose";
import { ICreateReview, IReview } from "../../interfaces/IReview";
import { IBaseRepository } from "./IBaseRepository";

export interface IReviewRepository extends IBaseRepository<IReview> {
    createReview(reviewData: ICreateReview): Promise<IReview>;
    getReviewsForUser(userId: ObjectId): Promise<IReview[]>;
}
