import mongoose, { Document, ObjectId } from "mongoose";
import { PaymentStatus } from "../enums/PaymentStatus";


export interface IPayment extends Document {
    _id: ObjectId;
    contractId: ObjectId;
    milestoneId: ObjectId;
    clientId: ObjectId;
    freelancerId: ObjectId;
    amount: number;
    stripeSessionId?: string;
    stripePaymentIntentId?: string;
    stripeChargeId?: string;
    status: PaymentStatus;
    escrowId: ObjectId;
}