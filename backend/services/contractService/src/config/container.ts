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

import { ReviewController } from "../controllers/review.controller";
import { ReviewService } from "../services/implementation/review.service";
import { ReviewRepository } from "../repositories/implementation/review.repository";

import { FileUploader } from "../utils/fileUploader";

const fileUploader = new FileUploader();

//repositories
const applicationRepository = new ApplicationRepository(Application);
const contractRepository = new ContractRepository(Contract);
const offerRepository = new OfferRepository(Offer);
const userRepository = new UserRepository(User);
const submissionRepository = new SubmissionRepository();
const reviewRepository = new ReviewRepository();

//services
const applicationService = new ApplicationSerivce(applicationRepository);
const contractService = new ContractService(contractRepository, applicationRepository);
const offerService = new OfferService(offerRepository, applicationRepository, contractService);
const userService = new UserService(userRepository, reviewRepository);
const submissionService = new SubmissionService(submissionRepository, contractService, fileUploader);
const reviewService = new ReviewService(reviewRepository, contractRepository, userService);

//controllers
const applicationController = new ApplicationController(applicationService);
const contractController = new ContractController(contractService);
const offerController = new OfferController(offerService);
const submissionController = new SubmissionController(submissionService);
const reviewController = new ReviewController(reviewService);

// consumers
const jobApproveConsumer = new JobApprovalConsumer(contractService, "job_approval_exchange");
const offerConsumer = new CreateOfferConsumer(offerService, "offer_created_exchange");
const applicationConsumer = new CreateApplicationConsumer(applicationService, "job.application.created");
const paymentSuccessConsumer = new PaymentSuccessConsumer(contractService, "payment_success_exchange");
const userConsumer = new UserConsumer(userService);

export async function intialiseConsumers() {
    jobApproveConsumer.initialise();
    offerConsumer.initialise();
    applicationConsumer.initialise();
    paymentSuccessConsumer.initialise();
    userConsumer.initialise();
}

export { offerController, contractController, applicationController, submissionController, reviewController };