import Stripe from "stripe";
import { IPayment } from "../../interfaces/IPayment";

export interface IPaymentService {
    createSession(milestoneId: string, milestoneAmount: number, contractId: string, freelancerId: string, clientId: string): Promise<string | null>;
    handleStripeWebhook(event: Stripe.Event): void;
    savePayment(session: Stripe.Checkout.Session): Promise<IPayment>;

    // createPaymentIntent(amount: number, currency: string): void;
    // confirmPayment(paymentIntentId: string):void;
}