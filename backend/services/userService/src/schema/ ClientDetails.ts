import mongoose, { Schema } from "mongoose";

const ClientDetails: Schema = new Schema(
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

export const ClientDetail = mongoose.model("ClientDetail", ClientDetails);
