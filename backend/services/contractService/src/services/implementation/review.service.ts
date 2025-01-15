
import { IReviewService } from "../interfaces/IReviewService";
import { ICreateReview, IGetReviews, IReview } from "../../interfaces/IReview";
import { IReviewRepository } from "../../repositories/interfaces/IReviewRepository";
import { ObjectId } from "mongoose";
import { ReviewDTO } from "../../dto/review.dto";
import { IUserService } from "../interfaces/IUserService";
import { IContractRepository } from "../../repositories/interfaces/IContractRepository";


export class ReviewService implements IReviewService {
    private _reviewRepository: IReviewRepository;
    private _contractRepository: IContractRepository;
    private _userService: IUserService;

    constructor(reviewRepository: IReviewRepository, contractRepository: IContractRepository, userService: IUserService) {
        this._reviewRepository = reviewRepository;
        this._contractRepository = contractRepository;
        this._userService = userService;
    }

    async submitReview(reviewData: ReviewDTO, reviewerId: ObjectId): Promise<IReview> {

        const contract = await this._contractRepository.findById(reviewData.contractId);

        if (!contract) {
            throw new Error("Contract not found");
        }

        if (contract.status !== 'completed') {
            throw new Error("Can only review completed contracts");
        }

        // Determine review type and reviewee
        const isClientReview = contract.clientId.toString() === reviewerId.toString();

        const createReviewData: ICreateReview = {
            ...reviewData,
            reviewerId,
            revieweeId: isClientReview ? contract.freelancerId : contract.clientId,
            type: isClientReview ? "CLIENT_TO_FREELANCER" : "FREELANCER_TO_CLIENT",
        };

        const review = await this._reviewRepository.createReview(createReviewData);
        await this._contractRepository.update(contract._id as ObjectId, { [isClientReview ? 'clientReviewed' : 'freelancerReviewed']: true });

        await this._userService.updateUserRating(review.revieweeId);
        return review;
    }

    async getReviews(userId: ObjectId): Promise<IReview[]> {
        const reviews =  await this._reviewRepository.getReviewsForUser(userId);
        return reviews;
    //     const reviewsData : IGetReviews[] = reviews.map((review) => {
    //         return {
    //             userId: review.revieweeId,
    //             type: review.type === "CLIENT_TO_FREELANCER" ? "CLIENT" : "FREELANCER",
    //             rating: review.rating,
    //             comment: review.comment,
    //             createdAt: review.createdAt,
    //         }
    //     })

    //     return reviewsData;
    }
}
