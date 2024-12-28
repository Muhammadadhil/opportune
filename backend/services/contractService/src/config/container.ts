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
import Application from "../schema/applications.schema";

import { JobApprovalConsumer } from "../events/rabbitmq/consumers/jobApproveConsumer";
import { CreateOfferConsumer } from "../events/rabbitmq/consumers/createOfferConsumer";
import { CreateApplicationConsumer } from "../events/rabbitmq/consumers/applicationConsumer";
import { PaymentSuccessConsumer } from '../events/rabbitmq/consumers/paymentConsumer'
import { UserConsumer } from "../events/rabbitmq/consumers/UserConsumer";
import { UserService } from "../services/implementation/user.services";
import { UserRepository } from "../repositories/implementation/user.repository";
import { User } from "../schema/user.schema";

import { SubmissionController } from "../controllers/submission.controller";
import { SubmissionService } from "../services/implementation/submission.service";
import { SubmissionRepository } from "../repositories/implementation/submission.repository";

import { FileUploader } from "../utils/fileUploader";


const fileUploader = new FileUploader();
const submissionRepository = new SubmissionRepository();
const submissionService = new SubmissionService(submissionRepository, fileUploader);
const submissionController = new SubmissionController(submissionService);


//repositories
const applicationRepository = new ApplicationRepository(Application);
const contractRepository = new ContractRepository(Contract);
const offerRepository = new OfferRepository(Offer);
const userRepository = new UserRepository(User);

//services
const applicationService = new ApplicationSerivce(applicationRepository);
const contractService = new ContractService(contractRepository,applicationRepository);
const offerService = new OfferService(offerRepository,applicationRepository,contractService);
const userService = new UserService(userRepository);

//controllers
const applicationController = new ApplicationController(applicationService);
const contractController = new ContractController(contractService);
const offerController = new OfferController(offerService);

// consumers
const jobApproveConsumer = new JobApprovalConsumer(contractService, "job_approval_exchange");
const offerConsumer = new CreateOfferConsumer(offerService, "offer_created_exchange");
const applicationConsumer = new CreateApplicationConsumer(applicationService,"job.application.created");
const paymentSuccessConsumer = new PaymentSuccessConsumer(contractService, "payment_success_exchange");
const userConsumer = new UserConsumer(userService);


export async function intialiseConsumers() {
    jobApproveConsumer.initialise();
    offerConsumer.initialise();
    applicationConsumer.initialise();
    paymentSuccessConsumer.initialise();
    userConsumer.initialise();
}

export { offerController, contractController, applicationController, submissionController };