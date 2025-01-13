import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IReview extends Document {
    contractId: ObjectId;
    reviewerId: ObjectId; // User giving the review
    revieweeId: ObjectId; // User being reviewed
    rating: number;       // 1-5 stars
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

const ReviewSchema: Schema = new Schema<IReview>(
    {
        contractId: { type: Schema.Types.ObjectId, required: true, ref: "Contract" },
        reviewerId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        revieweeId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        type: { type: String, required: true, enum: ["CLIENT_TO_FREELANCER", "FREELANCER_TO_CLIENT"] },
    },
    { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", ReviewSchema);


