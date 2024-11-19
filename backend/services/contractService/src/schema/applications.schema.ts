import mongoose, { Schema } from "mongoose";
import { IApplication } from "../interfaces/IApplication";
import { ApplicationStutus } from "../enums/ApplicationStatus";

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
            enum: Object.values(ApplicationStutus),
            required: true,
            default: ApplicationStutus.PENDING,
        },
    },
    { timestamps: true }
);

const Application = mongoose.model<IApplication>("application", applicationSchema);
export default Application;
