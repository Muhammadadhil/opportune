import mongoose, { Schema } from "mongoose";
import IClientDetail from "../interfaces/IClientDetail";

const ClientDetails = new Schema<IClientDetail>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        companyName: {
            type: String,
        },
        companyDescription: {
            type: String,
        },
        projectNeeds: {
            type: [String],
            required: true,
        },
        website: {
            type: String,
        },
    },
    { timestamps: true }
);

export const ClientDetail = mongoose.model<IClientDetail>("ClientDetail", ClientDetails);
