
import { Document, ObjectId, Schema } from "mongoose";

export interface IReview extends Document {
    contractId: ObjectId;
    reviewerId: ObjectId; 
    revieweeId: ObjectId; 
    rating: number;       
    comment: string;
    type: "CLIENT_TO_FREELANCER" | "FREELANCER_TO_CLIENT";
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateReview {
    contractId: Schema.Types.ObjectId;
    reviewerId: Schema.Types.ObjectId;
    revieweeId: Schema.Types.ObjectId;
    rating: number;
    comment: string;
    type: "CLIENT_TO_FREELANCER" | "FREELANCER_TO_CLIENT";
}


export interface IGetReviews {
    userId: ObjectId;
    type: "CLIENT" | "FREELANCER";
    rating: number;
    comment: string;
    createdAt: Date;

}