import mongoose, { Schema } from "mongoose";
import { IGig } from "../interfaces/IGig";

const adminSchema = new Schema<IGig>({
    freelancer_id: {
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
});

const Admin = mongoose.model<IGig>("Gig", adminSchema);
export default Admin;
