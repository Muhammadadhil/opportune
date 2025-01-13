import { ObjectId } from "mongoose";
import { ReviewDTO } from "../../dto/review.dto";
import { IReview } from "../../schema/review.schema";

export interface IReviewService {
    submitReview(reviewData: ReviewDTO, reviewerId: ObjectId): Promise<IReview>;
}
