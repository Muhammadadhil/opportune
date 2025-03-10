import { ObjectId } from "mongoose";
import { IOffer } from "../../interfaces/IOffer";
import { IApplicationRepository } from "../../repositories/interfaces/IApplicationRepository";
import { IOfferRepository } from "../../repositories/interfaces/IOfferRepository";
import { IContractService } from "../interfaces/IContractService";
import { IOfferService } from "../interfaces/IOfferService";


export class OfferService implements IOfferService {
    
    private _offerRepository: IOfferRepository;
    private _applicationRepository: IApplicationRepository;
    private _contractService: IContractService;

    constructor(
        private readonly offerRepository: IOfferRepository,
        private readonly applicationRepository: IApplicationRepository,
        private readonly contractService: IContractService) 
    {
        this._offerRepository = offerRepository;
        this._applicationRepository = applicationRepository;
        this._contractService = contractService;
    }

    async createOffer(data: IOffer): Promise<IOffer | null> {
        try {
            const offer = await this._offerRepository.create(data);
            console.log("created offer:", offer);
            await this._applicationRepository.updateStatus(offer.applicationId, "offerSent");
            return offer;
        } catch (error) {
            console.log("Error in creating Contract:", error);
            return null;
        }
    }

    async getFreelancerOffers(freelancerId: string): Promise<IOffer[] | null> {
        const offers = await  this._offerRepository.populatedFreelancerOffers(freelancerId);
        console.log("offers :", offers);
        return offers;
    }

    async getClientOffers(clientId: string): Promise<IOffer[] | null> {
        const offers = await this._offerRepository.find({ clientId });
        console.log('offers :',offers);
        return offers
    }

    async acceptOffer(offerId: ObjectId, status: string): Promise<IOffer | null> {
        const updatedOffer = await this._offerRepository.update(offerId, { status });

        console.log('updateOffer:',updatedOffer);

        if (updatedOffer && updatedOffer.status == "accepted") {
            this._contractService.createContract(updatedOffer);
            console.log("updateOffer accepted" );
        }   
        
        return updatedOffer;
    }
}
