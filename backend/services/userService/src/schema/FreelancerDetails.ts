import mongoose, { Schema } from "mongoose";
import IFreelancer from "../interfaces/IFreelancer";

const freelancerDetails: Schema = new Schema<IFreelancer>(
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
        },
        prefferedJobs: {   
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

export const FreelancerDetails = mongoose.model<IFreelancer>("FreelancerDetail", freelancerDetails);
