
import { RabbitMQConsumer } from "../../events/rabbitmq/Consumer";
import { IOffer } from "../../interfaces/IOffer";
import { ApplicationRepository } from "../../repositories/implementation/application.repository";
import { OfferRepository } from "../../repositories/implementation/offer.repository";
import { IApplicationRepository } from "../../repositories/interfaces/IApplicationRepository";
import { IOfferRepository } from "../../repositories/interfaces/IOfferRepository";
import { IContractService } from "../interfaces/IContractService";
import { IOfferService } from "../interfaces/IOfferService";


export class OfferService implements IOfferService {

    private _offerRepository: IOfferRepository;
    private _applicationRepository: IApplicationRepository;
    private _contractService: IContractService;
    private consumer;

    constructor(
        offerRepository:IOfferRepository,
        applicationRepository:IApplicationRepository,
        contractService:IContractService)
    {
        this._offerRepository = offerRepository;
        this._applicationRepository = applicationRepository;
        this._contractService = contractService;
        this.consumer = new RabbitMQConsumer();
    }

    async initialize() {
        try {
            await this.consumer.connect();
            const exchangeName = "offer_created_exchange";
            await this.consumer.consumeFromFanoutExchange(exchangeName, (message) => {
                console.log("Processing offer message:", message);
                this.createOffer(message);
            });
        } catch (error) {
            console.error("Failed to initialize Contract Service:", error);
        }
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
        return this._offerRepository.find({ freelancerId });
    }

    async getClientOffers(clientId: string): Promise<IOffer[] | null> {
        return this._offerRepository.find({ clientId });
    }

    async acceptOffer(offerId: string,status:string): Promise<IOffer | null> {

        const updatedOffer =await this._offerRepository.update(offerId, { status });

        if (updatedOffer && updatedOffer.status == "accepted") {
            
        } 

        // publish a message : " offer accepted " for notification service , 
        // call createContract function : pass the offerId, 
            // get the offer datails from there
            // save contract there


        return updatedOffer;

    }
}
