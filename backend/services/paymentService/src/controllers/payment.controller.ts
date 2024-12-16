import { NextFunction, Request, Response } from "express";
import { IPaymentService } from "../services/interfaces/IPaymentService";
import Stripe from "stripe";

export class PaymentController {
    private _paymentService: IPaymentService;

    constructor(private readonly paymentService: IPaymentService) {
        this._paymentService = paymentService;
    }

    // constructor(private readonly paymentService: IPaymentService) {
    //     this._paymentService = paymentService;
    // }

    async createCheckoutSession(req: Request, res: Response, next: NextFunction) {
        try {
            const { milestoneAmount, contractId, freelancerId, clientId, milestoneId } = req.body;
            console.log('creating checkout session:',milestoneAmount, contractId, freelancerId, clientId, milestoneId);
            const sessionId = await this._paymentService.createSession(milestoneId,milestoneAmount, contractId, freelancerId, clientId);
            if(sessionId){
                res.status(201).json(sessionId);
            }else{
                res.status(409).json({error: 'One payment already exists for this milestone'});
            }
            
        } catch (error) {
            next(error);
        }
    }

    async handleWebhook(req: Request, res: Response, next: NextFunction) {
        try {
            const signature = req.headers["stripe-signature"];
            console.log('signature handle webhook contrller:',signature);

            if(!signature){
                throw new Error('No Stripe Signature found');
            }
            const event = Stripe.webhooks.constructEvent(req.body, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
            this._paymentService.handleStripeWebhook(event);
            res.status(200).end();

        } catch (error) {
            console.log('webhook error:',error);
            res.status(400).send(`Webhook Error: ${error}`);
        }
    }

    // async createPaymentIntent(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { amount, currency } = req.body;
    //         const clientSecret = await this._paymentService.createPaymentIntent(amount, currency);
    //         res.json(clientSecret);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async confirmPayment(req: Request, res: Response, next:NextFunction) {
    //     try {
    //         const { paymentIntentId } = req.body;
    //         const paymentIntent = await this._paymentService.confirmPayment(paymentIntentId);
    //         res.json(paymentIntent);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}    