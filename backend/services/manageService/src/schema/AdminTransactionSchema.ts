
import mongoose, { Schema, Document } from "mongoose";
import { TransactionType } from "../enums/TransactionType";
import { IAdminTransaction } from "../interfaces/IAdminTransactions";

const AdminTransactionSchema = new Schema<IAdminTransaction>(
    {
        amount: { type: Number, required: true },
        type: { type: String, enum: Object.values(TransactionType), required: true },
        escrowId: { type: Schema.Types.ObjectId, required: true },
        freelancerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        description: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IAdminTransaction>("AdminTransaction", AdminTransactionSchema);