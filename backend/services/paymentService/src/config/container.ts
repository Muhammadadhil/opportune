import { OfferController } from "../controllers/payment.controller";
import { OfferRepository } from "../repositories/implementation/offer.repository";
import { OfferService } from "../services/implementation/payment.services";

import Offer from "../schema/offer.schema";

import { CreateOfferConsumer } from "../events/rabbitmq/consumers/createOfferConsumer";

//repositories
const offerRepository = new OfferRepository(Offer);

//services
const offerService = new OfferService(offerRepository);

//controllers
const offerController = new OfferController(offerService);


// consumers
// const offerConsumer = new CreateOfferConsumer(offerService, "offer_created_exchange");


export async function intialiseConsumers() {
    // offerConsumer.initialise();
}

export { offerController };