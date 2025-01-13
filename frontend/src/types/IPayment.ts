import { EscrowStatus } from "@/enums/EscrowStatus";
import { PaymentStatus } from "@/enums/PaymentStatus";

export interface IPayment {
    _id: string;
    contractId: string;
    milestoneId: string;
    clientId: string;
    freelancerId: string;
    amount: number;
    stripeSessionId?: string;
    stripePaymentIntentId?: string;
    stripeChargeId?: string;
    status: PaymentStatus;
    escrowId: string;
    createdAt: string;
    escrow: {
        status: EscrowStatus;
        amount: number;
    };
}
