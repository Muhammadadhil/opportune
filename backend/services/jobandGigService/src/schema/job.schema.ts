import mongoose, { Schema,Types } from "mongoose";
import { IJob } from "../types/IJob";

const jobSchema = new Schema<IJob>(
    {
        clientId: {
            type: Types.ObjectId,
            required: true,
            ref: "User",
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
        applicantsCount: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

const Job = mongoose.model<IJob>("Job", jobSchema);
export default Job;
