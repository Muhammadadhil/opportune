
import { BaseRepository } from "./baseRepository";
import OfferModel from "../../schema/offer.schema";
import { IOffer } from "../../interfaces/IOffer";
import { IOfferRepository } from "../interfaces/IOfferRepository";

export class OfferRepository extends BaseRepository<IOffer> implements IOfferRepository {
    constructor() {
        super(OfferModel);
    }
}
