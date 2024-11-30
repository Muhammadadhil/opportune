
import { IOffer } from "../../interfaces/IOffer";

export interface IPaymentService {
    createPaymentIntent(amount: number, currency: string): void;
    confirmPayment(paymentIntentId: string):void;
}