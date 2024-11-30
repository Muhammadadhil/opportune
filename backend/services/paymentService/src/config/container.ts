import { PaymentController } from "../controllers/payment.controller";
import { PaymentRepository } from "../repositories/implementation/payment.repository";
import { PaymentService } from "../services/implementation/payment.services";

import PaymentModel from "../schema/payment.schema";

// import { CreateOfferConsumer } from "../events/rabbitmq/consumers/createOfferConsumer";

//repositories
const paymentRepository = new PaymentRepository(PaymentModel);

//services
const paymentService = new PaymentService(paymentRepository);

//controllers
const paymentController = new PaymentController(paymentService);


// consumers
// const offerConsumer = new CreateOfferConsumer(offerService, "offer_created_exchange");


export async function intialiseConsumers() {
    // offerConsumer.initialise();
}

export { paymentController };