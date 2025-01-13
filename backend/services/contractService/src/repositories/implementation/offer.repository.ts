
import { BaseRepository } from "./baseRepository";
// import OfferModel from "../../schema/offer.schema";
import { IOffer } from "../../interfaces/IOffer";
import { IOfferRepository } from "../interfaces/IOfferRepository";
import { Model } from "mongoose";

export class OfferRepository extends BaseRepository<IOffer> implements IOfferRepository {
    
    private offerModel: Model<IOffer>


    constructor(offerModel: Model<IOffer>) {
        super(offerModel);

        this.offerModel = offerModel
    }
    

    async populatedFreelancerOffers (freelancerId: string): Promise<IOffer[] | null> {
        const offers = await this.offerModel.find({ freelancerId }).sort({createdAt:-1}).populate('clientId', 'firstname lastname email').exec();
        return offers;
    }
}
