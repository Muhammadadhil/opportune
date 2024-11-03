import mongoose, { Schema } from "mongoose";
import { IGig } from "../interfaces/IGig";

const gigSchema = new Schema<IGig>({
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
        type: Date,
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
        validate: [arrayLimit, "{PATH} exceeds the limit of 3"], // Limit images to 3
    },
    requirements: {
        type: [{ type: String }],
    },
    imageUrls:{
        type:[String],
    }
});

function arrayLimit(val: string[]) {
    return val.length <= 3;
}

const Gig = mongoose.model<IGig>("Gig", gigSchema);
export default Gig;
