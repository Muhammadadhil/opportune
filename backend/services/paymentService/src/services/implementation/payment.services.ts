import Stripe from "stripe";
import { IPaymentRepository } from "../../repositories/interfaces/IPaymentRepository";
import { IPaymentService } from "../interfaces/IPaymentService";
// import { rabbitmqConnection } from '@_opportune/common'
import {PaymentStatus} from '../../enums/PaymentStatus';

import dotenv from "dotenv";
import { IPayment } from "../../interfaces/IPayment";
import mongoose from "mongoose";
dotenv.config();

export class PaymentService implements IPaymentService {
    private _paymentRepository: IPaymentRepository;
    private stripe: Stripe;

    constructor(private readonly paymentRepository: IPaymentRepository) {
        this._paymentRepository = paymentRepository;
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    }

    async createSession(milestoneId: string, milestoneAmount: number, contractId: string, freelancerId: string, clientId: string): Promise<string | null> {
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Milestone Payment for Contract ${contractId}`,
                        },
                        unit_amount: milestoneAmount * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/payment-success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
            metadata: {
                milestoneId,
                milestoneAmount,
                contractId,
                freelancerId,
                clientId,
            },
        });

        return session.id;
    }

    async handleStripeWebhook(event: Stripe.Event) {
        console.log("stripe handle webhook service");

        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object as Stripe.Checkout.Session;
                console.log("session: event.data.object :", session);
                this.savePayment(session);
                break;

            case "checkout.session.async_payment_failed":
                // await this.handleFailedPayment(event.data.object);
                break;
        }
    }

    async savePayment(session: Stripe.Checkout.Session): Promise<IPayment> {
        const { milestoneId, milestoneAmount, contractId, freelancerId, clientId } = session.metadata as {
            milestoneId: string;
            milestoneAmount: string;
            contractId: string;
            freelancerId: string;
            clientId: string;
        };
        const paymentData: Partial<IPayment> = {
            contractId: this.toObjectId(contractId),
            milestoneId: this.toObjectId(milestoneId),
            clientId: this.toObjectId(clientId),
            freelancerId: this.toObjectId(freelancerId),
            amount: Number(milestoneAmount),
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent as string,
        };

        const data = { ...paymentData, status: PaymentStatus.SUCCEEDED } as IPayment;
        return await this._paymentRepository.create(data);

        // // Trigger events or notifications
        // this.notifyContractService(payment);
        // this.notifyUserService(payment);
    }

    private toObjectId(id: string): mongoose.Types.ObjectId {
        return new mongoose.Types.ObjectId(id) ;
    }











    // async createPaymentIntent(amount: number, currency: string = "usd") {
    //     try {
    //         const paymentIntent = await this.stripe.paymentIntents.create({
    //             amount: amount * 100, // Convert to cents
    //             currency: currency,
    //         });

    //         // Publish payment intent creation event to message queue
    //         await this.publishPaymentEvent("payment_intent_created", {
    //             paymentIntentId: paymentIntent.id,
    //             amount: amount,
    //         });

    //         return paymentIntent.client_secret;
    //     } catch (error) {
    //         console.error("Payment Intent Creation Error:", error);
    //         throw error;
    //     }
    // }

    // async confirmPayment(paymentIntentId: string) {
    //     try {
    //         const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);

    //         // Publish payment confirmation event
    //         await this.publishPaymentEvent("payment_confirmed", {
    //             paymentIntentId: paymentIntent.id,
    //             status: paymentIntent.status,
    //         });

    //         return paymentIntent;
    //     } catch (error) {
    //         console.error("Payment Confirmation Error:", error);
    //         throw error;
    //     }
    // }

    // private async publishPaymentEvent(eventType: string, eventData: any) {
    //     const channel = await rabbitmqConnection(process.env.RABBITMQ_CONNECTION_URL!);
    //     channel.publish("payment_exchange", eventType, Buffer.from(JSON.stringify(eventData)));
    // }
}
