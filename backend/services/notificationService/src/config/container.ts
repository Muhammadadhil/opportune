import { NotificationController } from "../controllers/notification.controller";
import { NotificationRepository } from "../repositories/implementation/notification.repository";
import { NotificationService } from "../services/implementation/notification.services";

import NotificationModel from "../schema/notification.schema";

// import { CreateOfferConsumer } from "../events/rabbitmq/consumers/createOfferConsumer";
import { Publisher } from "../events/rabbitmq/producers/Publisher";

// const publisher = new Publisher();
// publisher.connect();

//repositories
const notificationRepository = new NotificationRepository(NotificationModel);

//services
const notificationService = new NotificationService(notificationRepository);

//controllers
const notificationController = new NotificationController(notificationService);


// consumers
// const offerConsumer = new CreateOfferConsumer(offerService, "offer_created_exchange");


export async function intialiseConsumers() {
    // offerConsumer.initialise();
}

export { notificationController };