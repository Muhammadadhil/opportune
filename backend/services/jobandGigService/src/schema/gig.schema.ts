import mongoose, { Schema } from "mongoose";
import { IGig } from "../types/IGig";

const gigSchema = new Schema<IGig>(
    {
        freelancerId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        subCategory: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        deliveryTime: {
            type: String,
            required: true,
        },
        reviewsCount: {
            type: Number,
        },
        averageRating: {
            type: Number,
        },
        searchTags: {
            type: [String],
            required: true,
        },
        images: {
            type: [String],
        },
        requirements: {
            type: [{ type: String }],
        },
        imageUrls: {
            type: [String],
        },
    },
    { timestamps: true }
);

function arrayLimit(val: string[]) {
    return val.length <= 3;
}

const Gig = mongoose.model<IGig>("Gig", gigSchema);
export default Gig;
