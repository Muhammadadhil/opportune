import { ObjectId } from "mongoose";
import { IApplication } from "../../interfaces/IApplication";
import { IOffer } from "../../interfaces/IOffer";

export interface IOfferService {
    initialize(): void;
    getClientOffers(clientId: string): Promise<IOffer[] | null>;
    getFreelancerOffers(freelancerId: string): Promise<IOffer[] | null>;
}
