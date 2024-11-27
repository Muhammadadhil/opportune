
import { RabbitMQConsumer } from "../../events/rabbitmq/Consumer";
import { IOffer } from "../../interfaces/IOffer";
import { ApplicationRepository } from "../../repositories/implementation/application.repository";
import { OfferRepository } from "../../repositories/implementation/offer.repository";
import { IApplicationRepository } from "../../repositories/interfaces/IApplicationRepository";
import { IOfferRepository } from "../../repositories/interfaces/IOfferRepository";
import { IOfferService } from "../interfaces/IOfferService";


export class OfferService implements IOfferService {
    private offerRepository: IOfferRepository;
    private applicationRepository: IApplicationRepository;

    private consumer;

    constructor() {
        this.offerRepository = new OfferRepository();
        this.applicationRepository = new ApplicationRepository();

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
            const offer = await this.offerRepository.create(data);
            console.log("created offer:", offer);
            await this.applicationRepository.updateStatus(offer.applicationId, "offerSent");
            return offer;
        } catch (error) {
            console.log("Error in creating Contract:", error);
            return null;
        }
    }

    getFreelancerOffers(freelancerId: string): Promise<IOffer[] | null> {
        return this.offerRepository.find({ freelancerId });
    }

    getClientOffers(clientId: string): Promise<IOffer[] | null> {
        return this.offerRepository.find({ clientId });
    }

    acceptOffer(offerId: string,status:string): Promise<IOffer | null> {

        const updatedOffer = this.offerRepository.update(offerId, { status });
        // publish a message : " offer accepted " for notification service , 
        // call createContract function : pass the offerId, 
            // get the offer datails from there
            // save contract there

            
        return updatedOffer;

    }
}
