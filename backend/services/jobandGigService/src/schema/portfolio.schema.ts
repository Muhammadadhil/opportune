import mongoose, { Schema } from "mongoose";
import { IPortfolio } from "../types/IPortfolio";

const portfolioSchema = new Schema<IPortfolio>(
    {
        freelancerId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String },
        skills: [{ type: String }],
        images: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

const Portfolio = mongoose.model<IPortfolio>("Portfolio", portfolioSchema);

export default Portfolio;