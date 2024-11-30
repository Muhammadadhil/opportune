import { Document, ObjectId } from "mongoose";

export interface IPayment extends Document {
    contractId: ObjectId;
    milestoneId: ObjectId;
    clientId: ObjectId;
    freelancerId: ObjectId;
    amount: number;
    currency: string;
    status: "pending" | "succeeded" | "failed" | "refunded";
    stripeSessionId: string;
    paymentIntentId?: string;
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}
