import { NextFunction, Request, Response } from "express";
import { IReviewService } from "../services/interfaces/IReviewService";


export class ReviewController {
    private _reviewService: IReviewService;

    constructor(reviewService: IReviewService) {
        this._reviewService = reviewService;
    }

    async submitReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { contractId, rating, comment, reviewerId } = req.body;
            const review = await this._reviewService.submitReview({ contractId, rating, comment }, reviewerId);
            return res.status(201).json(review);
        } catch (error) {
            console.log("Error in submitting review:", error);
            next(error);
        }
    }
}
