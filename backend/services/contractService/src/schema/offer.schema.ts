import mongoose, { Schema } from "mongoose";
import { IOffer } from '../interfaces/IOffer';
import { OfferStatus } from '../enums/OfferStatus';
import MilestoneSchema from "./milestone.schema";

const OfferSchema = new Schema<IOffer>(
    {
        applicationId: { type: mongoose.Types.ObjectId, required: true },
        jobId: { type: mongoose.Types.ObjectId, required: true },
        freelancerId: { type: mongoose.Types.ObjectId, required: true , ref: 'User'},
        clientId: { type: mongoose.Types.ObjectId, required: true , ref: 'User' },
        milestones: { type: [MilestoneSchema], required: true },
        workTitle: { type: String, required: true },
        workDescription: { type: String, required: true },
        totalAmount: { type: Number, required: true },
        status: { type: String, OfferStatus, default: OfferStatus.PENDING },
    },
    {
        timestamps: true,
    }
);

const Offer = mongoose.model<IOffer>("Offer", OfferSchema);

export default Offer;



