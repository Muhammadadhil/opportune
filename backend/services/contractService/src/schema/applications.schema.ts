import mongoose, { Schema } from "mongoose";
import { IApplication } from "../interfaces/IApplication";

const applicationSchema = new Schema<IApplication>(
    {
        jobId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        clientId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        freelancerId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Application = mongoose.model<IApplication>("application", applicationSchema);
export default Application;
