import mongoose, { Schema } from "mongoose";
import { IPayment } from "../interfaces/IPayment";
import { PaymentStatus } from "../enums/PaymentStatus";


const PaymentSchema = new mongoose.Schema<IPayment>(
    {
        contractId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        milestoneId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        clientId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        freelancerId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        stripeSessionId: String,
        stripePaymentIntentId: String,
        stripeChargeId: String,
        status: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.PENDING,
        },
    },
    {
        timestamps: true,
    }
);
const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
