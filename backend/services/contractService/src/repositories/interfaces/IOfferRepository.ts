import { IOffer } from "../../interfaces/IOffer";
import { IBaseRepository } from "./IBaseRepository";

export interface IOfferRepository extends IBaseRepository<IOffer> {

    populatedFreelancerOffers(freelancerId: string): Promise<IOffer[] | null>;
    
}
