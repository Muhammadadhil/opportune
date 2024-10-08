import mongoose, { Schema } from "mongoose";
// import IUser from "../interfaces/IUser";

const ClientDetails: Schema = new Schema({
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
});

export const ClientDetail = mongoose.model("ClientDetail", ClientDetails);
