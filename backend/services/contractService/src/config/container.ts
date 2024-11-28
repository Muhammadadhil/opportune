import { ApplicationController } from "../controllers/application.controller";
import { ContractController } from "../controllers/contract.controller";
import { OfferController } from "../controllers/offer.controller";
import { ApplicationRepository } from "../repositories/implementation/application.repository";
import { ContractRepository } from "../repositories/implementation/contract.repository";
import { OfferRepository } from "../repositories/implementation/offer.repository";
import { ApplicationSerivce } from "../services/implementation/Application.services";
import { ContractService } from "../services/implementation/contract.services";
import { OfferService } from "../services/implementation/offer.services";

import Offer from "../schema/offer.schema";
import Contract from "../schema/contract.schema";
import { JobApprovalConsumer } from "../events/rabbitmq/consumers/jobApproveConsumer";

//repositories
const applicationRepository = new ApplicationRepository();
const contractRepository = new ContractRepository(Contract);
const offerRepository = new OfferRepository(Offer);

//services
const applicationService = new ApplicationSerivce();
const contractService = new ContractService(contractRepository,applicationRepository);
const offerService = new OfferService(offerRepository,applicationRepository,contractService);

//controllers
const applicationController = new ApplicationController();
const contractController = new ContractController(contractService);
const offerController = new OfferController(offerService);

// consumers
const jobApproveConsumer = new JobApprovalConsumer(contractService, "job_approval_exchange");

export async function intialiseConsumers() {
    jobApproveConsumer.initialise();
}

export { offerController, contractController };