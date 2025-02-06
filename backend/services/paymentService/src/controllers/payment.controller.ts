import { NextFunction, Request, Response } from "express";
import { IPaymentService } from "../services/interfaces/IPaymentService";
import Stripe from "stripe";
import { IEscrow } from "../interfaces/IEscrow";

export class PaymentController {
    private _paymentService: IPaymentService;

    constructor(private readonly paymentService: IPaymentService) {
        this._paymentService = paymentService;
        this.handleReleasePayment = this.handleReleasePayment.bind(this);
        this.getAllPayments = this.getAllPayments.bind(this);
        this.getEscrowPayments = this.getEscrowPayments.bind(this);
    }

    async createCheckoutSession(req: Request, res: Response, next: NextFunction) {
        try {
            const { milestoneAmount, contractId, freelancerId, clientId, milestoneId } = req.body;
            console.log("creating checkout session:", milestoneAmount, contractId, freelancerId, clientId, milestoneId);
            const sessionId = await this._paymentService.createSession(milestoneId, milestoneAmount, contractId, freelancerId, clientId);
            if (sessionId) {
                res.status(201).json(sessionId);
            } else {
                res.status(409).json({ error: "One payment already exists for this milestone" });
            }
        } catch (error) {
            next(error);
        }
    }

    async handleWebhook(req: Request, res: Response, next: NextFunction) {
        try {
            const signature = req.headers["stripe-signature"];
            console.log("signature :", signature);
            console.log("body handle webhook contrller:", req.body);
            console.log("webhook signing secret:", process.env.STRIPE_WEBHOOK_SECRET!.trim());

            if (!req.body) {
                throw new Error("No request body found");
            }

            if (!signature) {
                throw new Error("No Stripe Signature found");
            }
            const event = Stripe.webhooks.constructEvent(req.body, signature!, process.env.STRIPE_WEBHOOK_SECRET!.trim());
            this._paymentService.handleStripeWebhook(event);
            res.status(200).end();
        } catch (error) {
            console.log("webhook error:", error);
            res.status(400).send(`Webhook Error: ${error}`);
        }
    }

    async handleReleasePayment(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("!!!!!!!!!!!!!!!!! releasing payment in payment Service !!!!!!!!!!!!!!1:", req.body);
            const { escrowId } = req.body;
            const paymentIntent = await this._paymentService.releasePayment(escrowId);
            res.json(paymentIntent);
        } catch (error) {
            next(error);
        }
    }

    async getAllPayments(req: Request, res: Response, next: NextFunction) {
        try {
            const payments = await this._paymentService.getAllPayments();
            res.json(payments);
        } catch (error) {
            next(error);
        }
    }

    async getEscrowPayments(req: Request, res: Response, next: NextFunction) {  
        try {
            const payments = await this._paymentService.getEscrowPayments();
            res.json(payments);
        } catch (error) {
            next(error);
        }
    }
}