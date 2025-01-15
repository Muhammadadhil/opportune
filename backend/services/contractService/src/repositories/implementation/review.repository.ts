import { IReviewRepository } from "../interfaces/IReviewRepository";
import { ICreateReview, IReview } from "../../interfaces/IReview";
import { BaseRepository } from "./baseRepository";
import { Review } from "../../schema/review.schema";
import { ObjectId } from "mongoose";

export class ReviewRepository extends BaseRepository<IReview> implements IReviewRepository {
    private Review = Review;

    constructor() {
        super(Review);
    }

    async createReview(reviewData: ICreateReview): Promise<IReview> {
        const review = new this.Review(reviewData);
        return await review.save();
    }

    async getReviewsForUser(userId: ObjectId): Promise<IReview[]> {
        return this.Review.find({ revieweeId: userId }).populate('reviewerId','firstname lastname email country role');
    }   
}
