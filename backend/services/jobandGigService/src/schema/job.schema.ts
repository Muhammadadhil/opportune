import mongoose, { Schema } from "mongoose";
import { IJob } from "../interfaces/IJob";

const jobSchema = new Schema<IJob>(
    {
        clientId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        jobTitle: {
            type: String,
            required: true,
        },
        description: {
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
        budget: {
            type: Number,
            required: true,
        },
        skillsRequired: {
            type: [String],
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        searchTags: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

const Job = mongoose.model<IJob>("Job", jobSchema);
export default Job;
