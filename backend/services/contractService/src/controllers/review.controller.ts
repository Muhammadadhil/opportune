import { NextFunction, Request, Response } from "express";
import { IReviewService } from "../services/interfaces/IReviewService";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongoose";


export class ReviewController {
    private _reviewService: IReviewService;

    constructor(reviewService: IReviewService) {
        this._reviewService = reviewService;
        this.submitReview = this.submitReview.bind(this);
        this.getReviews = this.getReviews.bind(this);
    }

    async submitReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { contractId, rating, comment, reviewerId } = req.body;
            const review = await this._reviewService.submitReview({ contractId, rating, comment }, reviewerId);
            return res.status(StatusCodes.CREATED).json(review);
        } catch (error) {
            console.log("Error in submitting review:", error);
            next(error);
        }
    }

    async getReviews(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const reviews = await this._reviewService.getReviews(userId as unknown as ObjectId);
            return res.status(StatusCodes.OK).json(reviews);
        } catch (error) {
            next(error);
        }
    }
}
