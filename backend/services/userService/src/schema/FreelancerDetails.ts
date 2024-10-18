import mongoose, { Schema } from "mongoose";

const freelancerDetails: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
        },
        accounts: {
            linkedin: { type: String, default: "" },
            github: { type: String, default: "" },
            other: { type: String, default: "" },
        },
        image: {
            type: String,
        }
    },
    { timestamps: true }
);

export const FreelancerDetails = mongoose.model("FreelancerDetail", freelancerDetails);
