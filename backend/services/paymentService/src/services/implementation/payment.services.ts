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
import e from "express";
import axios from "axios";

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
            throw new CustomError("Error in releasing payment", 500);
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

    async releasePayment(escrowId: string): Promise<IEscrow | null> {
        try {
            console.log("releasing payment in payment service layerrrrrr:", escrowId);

            const escrow = await this._escrowRepository.findOne({ _id: escrowId });
            console.log("escrow :", escrow);

            if (!escrow) {
                console.log("escrow not found: throwing error", escrow);
                throw new CustomError("Escrow not found", 404);
            }

            if (escrow.status !== EscrowStatus.HOLDING) {
                throw new CustomError("Escrow is not in holding status", 400);
            }

            const commissionRate = 0.1;
            const commissionAmount = escrow.amount * commissionRate;
            const freelancerAmount = escrow.amount - commissionAmount;

            console.log('commisions:',commissionRate,commissionAmount,freelancerAmount);
            // update the commison and frelancer amount in escrow

            const updatedEscrow = await this._escrowRepository.update(escrowId as unknown as ObjectId, {
                status: EscrowStatus.RELEASED,
                commission: commissionAmount,
                freelancerAmount: freelancerAmount,
            });

            // record the commision of the admin in managee service
            console.log("!!!! record the commision of the admin in managee service !!!!");
            await axios.post(`http://localhost:3010/record/commission`, { commissionAmount, updatedEscrow });

            // add freeelacer amount to user wallet
            //adCh1
            await axios.post(`http://localhost:3015/wallet/update/${updatedEscrow?.freelancerId}`, {...updatedEscrow,amount: freelancerAmount});

            return escrow;
            
        } catch (error) {
            console.log('payment service layer error:',error);
            return null;
        }
    }

    async getAllPayments(){
        return await this._paymentRepository.find();
    }


    async getEscrowPayments(){
        return await this._escrowRepository.getAllHoldingEscrows();
    }

}
