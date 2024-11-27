import { NextFunction, Request, Response } from "express";
import { IOfferService } from "../services/interfaces/IOfferService";
import { OfferService } from "../services/implementation/offer.services";

export class OfferController {
    private offerService: IOfferService;

    constructor() {
        this.offerService = new OfferService();
    }

    clietOffers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ClientId } = req.query;
            const offers = await this.offerService.getClientOffers(ClientId as string);
            return res.status(200).json(offers);
        } catch (error) {
            console.error("Error in getting contract:", error);
            next(error);
        }
    };

    freelancerOffers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query;
            const offers = await this.offerService.getFreelancerOffers(id as string);
            return res.status(200).json(offers);
        } catch (error) {
            console.error("Error in getting contract:", error);
            next(error);
        }
    };

    updateOffer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {offerId,status} = req.body;
            console.log("offerId",offerId);
            console.log("status:",status);
            
            const offer = await this.offerService.acceptOffer(offerId,status);
            res.status(200).json({success:true,offer});
            
        } catch (error) {
            console.error("Error in getting contract:", error);
            next(error);
        }
    };
}    