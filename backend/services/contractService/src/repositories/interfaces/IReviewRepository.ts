import { ObjectId } from "mongoose";
import { ICreateReview, IReview } from "../../schema/review.schema";
import { IBaseRepository } from "./IBaseRepository";

export interface IReviewRepository extends IBaseRepository<IReview> {
    createReview(reviewData: ICreateReview): Promise<IReview>;
    getReviewsForUser(userId: ObjectId): Promise<IReview[]>;
}
