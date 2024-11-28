import { NextFunction, Request, Response } from "express";
import { IOfferService } from "../services/interfaces/IOfferService";
// import { OfferService } from "../services/implementation/offer.services";

export class OfferController {

    private _offerService: IOfferService;

    constructor(offerService: IOfferService) {
        this._offerService = offerService 
    }

    clietOffers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ClientId } = req.query;
            const offers = await this._offerService.getClientOffers(ClientId as string);
            return res.status(200).json(offers);
        } catch (error) {
            console.error("Error in getting contract:", error);
            next(error);
        }
    };

    freelancerOffers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('jaslkdfjalkdfjalksdfj;lkj');
            const { id } = req.query;
            const offers = await this._offerService.getFreelancerOffers(id as string);
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
            
            const offer = await this._offerService.acceptOffer(offerId,status);
            res.status(200).json({success:true,offer});
            
        } catch (error) {
            console.error("Error in getting contract:", error);
            next(error);
        }
    };
}    