import { ObjectId } from "mongoose";
import { ReviewDTO } from "../../dto/review.dto";
import { IReview } from "../../interfaces/IReview";
import { IGetReviews } from "../../interfaces/IReview";

export interface IReviewService {
    submitReview(reviewData: ReviewDTO, reviewerId: ObjectId): Promise<IReview>;
    getReviews(userId: ObjectId): Promise<IReview[]>
}
