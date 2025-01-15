import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IReview } from "../interfaces/IReview";

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


