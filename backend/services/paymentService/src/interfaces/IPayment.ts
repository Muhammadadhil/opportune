import mongoose, { Document, ObjectId } from "mongoose";
import { PaymentStatus } from "../enums/PaymentStatus";
export interface IPayment extends Document {
    _id: mongoose.Types.ObjectId;
    contractId: mongoose.Types.ObjectId;
    milestoneId: mongoose.Types.ObjectId;
    clientId: mongoose.Types.ObjectId;
    freelancerId: mongoose.Types.ObjectId;
    amount: number;
    stripeSessionId?: string;
    stripePaymentIntentId?: string;
    stripeChargeId?: string;
    status: PaymentStatus;
}