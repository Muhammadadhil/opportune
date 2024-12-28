import mongoose, { Schema } from "mongoose";
import { IEscrow } from "../interfaces/IEscrow";
import { EscrowStatus } from "../enums/EscrowStatus";

const EscrowSchema = new mongoose.Schema<IEscrow>(
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
        paymentId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(EscrowStatus),
            default: EscrowStatus.HOLDING, 
        },
    },
    {
        timestamps: true,
    }
);

const Escrow = mongoose.model<IEscrow>("Escrow", EscrowSchema);
export default Escrow;
