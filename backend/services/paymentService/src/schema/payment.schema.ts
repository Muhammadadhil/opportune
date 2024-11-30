import mongoose from "mongoose";
import { IPayment } from "../interfaces/IPayment";

const paymentSchema = new mongoose.Schema<IPayment>(
    {
        contractId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contract",
            required: true,
        },
        milestoneId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Milestone",
            required: true,
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        freelancerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            required: true,
            default: "USD",
        },
        status: {
            type: String,
            enum: ["pending", "succeeded", "failed", "refunded"],
            default: "pending",
        },
        stripeSessionId: {
            type: String,
            required: true,
        },
        paymentIntentId: {
            type: String,
        },
        metadata: {
            type: Object,
        },
    },
    { timestamps: true }
);

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;
