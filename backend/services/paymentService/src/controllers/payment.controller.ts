import { NextFunction, Request, Response } from "express";
import { IPaymentService } from "../services/interfaces/IPaymentService";

export class OfferController {
    private _paymentService: IPaymentService;

    constructor(paymentService: IPaymentService) {
        this._paymentService = paymentService;
    }

    async createPaymentIntent(req: Request, res: Response, next: NextFunction) {
        try {
            const { amount, currency } = req.body;
            const clientSecret = await this._paymentService.createPaymentIntent(amount, currency);
            res.json(clientSecret);
        } catch (error) {
            next(error);
        }
    }

    async confirmPayment(req: Request, res: Response, next:NextFunction) {
        try {
            const { paymentIntentId } = req.body;
            const paymentIntent = await this._paymentService.confirmPayment(paymentIntentId);
            res.json(paymentIntent);
        } catch (error) {
            next(error);
        }
    }
}    