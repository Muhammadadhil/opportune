
import { BaseRepository } from "./baseRepository";
// import OfferModel from "../../schema/offer.schema";
import { IOffer } from "../../interfaces/IOffer";
import { IOfferRepository } from "../interfaces/IOfferRepository";
import { Model } from "mongoose";

export class OfferRepository extends BaseRepository<IOffer> implements IOfferRepository {
    constructor(offerModel: Model<IOffer>) {
        super(offerModel);
    }
}
