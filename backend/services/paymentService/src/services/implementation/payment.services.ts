import Stripe from "stripe";
import { IPaymentRepository } from "../../repositories/interfaces/IPaymentRepository";
import { IPaymentService } from "../interfaces/IPaymentService";
import {PaymentStatus} from '../../enums/PaymentStatus';
import dotenv from "dotenv";
import { IPayment } from "../../interfaces/IPayment";
import { ObjectId, Types } from "mongoose";
import { IEscrowRepository } from "../../repositories/interfaces/IEscrowRepository";
import { IEscrow } from "../../interfaces/IEscrow";
import { EscrowStatus } from "../../enums/EscrowStatus";
import { CustomError } from "@_opportune/common";

dotenv.config();

export class PaymentService implements IPaymentService {
    private _paymentRepository: IPaymentRepository;
    private _escrowRepository: IEscrowRepository;
    private _publisher: any;
    private stripe: Stripe;

    constructor(private readonly paymentRepository: IPaymentRepository, private readonly escrowRepository: IEscrowRepository, private readonly publisher: any) {
        this._paymentRepository = paymentRepository;
        this._escrowRepository = escrowRepository;
        this._publisher = publisher;
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    }

    async createSession(milestoneId: string, milestoneAmount: number, contractId: string, freelancerId: string, clientId: string): Promise<string | null> {
        console.log("milestoneId:", milestoneAmount);
        const amount = Number(Number(milestoneAmount).toFixed(2));
        const paymentExist = await this._paymentRepository.findOne({ milestoneId });
        if (paymentExist) {
            return null;
        }

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Milestone Payment for Contract ${contractId}`,
                        },
                        unit_amount: amount * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/payment-success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
            metadata: {
                milestoneId,
                milestoneAmount: amount,
                contractId,
                freelancerId,
                clientId,
            },
        });

        return session.id;
    }

    async handleStripeWebhook(event: Stripe.Event) {
        switch (event.type) {

            case "checkout.session.completed":

                const session = event.data.object as Stripe.Checkout.Session;
                this.handleSuccessPayment(session);
                
                break;

            case "checkout.session.async_payment_failed":
                // await this.handleFailedPayment(event.data.object);
                break;
        }
    }

    async handleSuccessPayment(session: Stripe.Checkout.Session) {
        try {
            // console.log("session: event.data.object :", session);
            const payment = await this.savePayment(session);
            const escrow = await this.createEscrow(payment);
            const paymentObject = payment.toObject();

            const paymentAndEscrowInfo = { ...paymentObject, escrowId: escrow._id, escrowStatus: escrow.status };
            console.log('payment and escrow info:',paymentAndEscrowInfo);
            await this._paymentRepository.update(payment._id, { escrowId: escrow._id as unknown as ObjectId });
            this._publisher.publish("payment_success_exchange", paymentAndEscrowInfo);

        } catch (error) {
            throw new CustomError("Error in handling successful payment", 500);
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
            contractId: new Types.ObjectId(contractId) as unknown as ObjectId,
            milestoneId: new Types.ObjectId(milestoneId) as unknown as ObjectId,
            clientId: new Types.ObjectId(clientId) as unknown as ObjectId,
            freelancerId: new Types.ObjectId(freelancerId) as unknown as ObjectId,
            amount: Number(milestoneAmount),
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent as string,
        };

        const data = { ...paymentData, status: PaymentStatus.SUCCEEDED } as IPayment;
        const payment = await this._paymentRepository.create(data);

        return payment;
    }

    async createEscrow(payment: IPayment): Promise<IEscrow> {
        const escrowData: Partial<IEscrow> = {
            contractId: payment.contractId,
            milestoneId: payment.milestoneId,
            clientId: payment.clientId,
            freelancerId: payment.freelancerId,
            amount: payment.amount,
            paymentId: payment._id,
            status: EscrowStatus.HOLDING,
        };

        if (!escrowData.contractId || !escrowData.milestoneId || !escrowData.clientId || !escrowData.freelancerId || !escrowData.amount || !escrowData.paymentId) {
            throw new Error("Missing required escrow data fields");
        }

        const escrow = await this._escrowRepository.create(escrowData as IEscrow);
        return escrow;
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
