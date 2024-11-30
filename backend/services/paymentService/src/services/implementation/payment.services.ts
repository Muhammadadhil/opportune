import Stripe from "stripe";
import { IOffer } from "../../interfaces/IOffer";
import { IOfferRepository } from "../../repositories/interfaces/IOfferRepository";
import { IPaymentService } from "../interfaces/IPaymentService";
import { rabbitmqConnection } from '@_opportune/common'
  

export class paymentService implements IPaymentService {
    private _offerRepository: IOfferRepository;
    private stripe: Stripe;

    constructor(private readonly offerRepository: IOfferRepository) {
        this._offerRepository = offerRepository;
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    }

    async createPaymentIntent(amount: number, currency: string = "usd") {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: amount * 100, // Convert to cents
                currency: currency,
            });

            // Publish payment intent creation event to message queue
            // await this.publishPaymentEvent("payment_intent_created", {
            //     paymentIntentId: paymentIntent.id,
            //     amount: amount,
            // });

            return paymentIntent.client_secret;
        } catch (error) {
            console.error("Payment Intent Creation Error:", error);
            throw error;
        }
    }

    async confirmPayment(paymentIntentId: string) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);

            // Publish payment confirmation event
            await this.publishPaymentEvent("payment_confirmed", {
                paymentIntentId: paymentIntent.id,
                status: paymentIntent.status,
            });

            return paymentIntent;
        } catch (error) {
            console.error("Payment Confirmation Error:", error);
            throw error;
        }
    }

    private async publishPaymentEvent(eventType: string, eventData: any) {
        const channel = await rabbitmqConnection(process.env.RABBITMQ_CONNECTION_URL!);
        channel.publish("payment_exchange", eventType, Buffer.from(JSON.stringify(eventData)));
    }
}
