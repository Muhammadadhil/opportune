
export interface IPaymentService {
    createSession(milestoneId: string,milestoneAmount: number, contractId: string, freelancerId: string, clientId: string): Promise<string | null>;

    // createPaymentIntent(amount: number, currency: string): void;
    // confirmPayment(paymentIntentId: string):void;
}