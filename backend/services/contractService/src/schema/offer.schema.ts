import mongoose, { Schema } from "mongoose";
import { IOffer,IMilestone } from '../interfaces/IOffer';
import { OfferStatus } from '../enums/OfferStatus';

const MilestoneSchema = new Schema<IMilestone>({
    milestoneId: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Approved"], default: "Pending" },
});

const OfferSchema = new Schema<IOffer>(
    {
        applicationId: { type: mongoose.Types.ObjectId, required: true },
        jobId: { type: mongoose.Types.ObjectId, required: true },
        freelancerId: { type: mongoose.Types.ObjectId, required: true },
        clientId: { type: mongoose.Types.ObjectId, required: true },
        milestones: { type: [MilestoneSchema], required: true },
        totalAmount: { type: Number, required: true },
        status: { type: String, OfferStatus, default: OfferStatus.PENDING },
    },
    {
        timestamps: true,
    }
);

const Offer = mongoose.model<IOffer>("Offer", OfferSchema);

export default Offer;
