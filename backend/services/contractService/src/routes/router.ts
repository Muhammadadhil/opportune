import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller";
import { ContractController } from "../controllers/contract.controller";
import { OfferController } from "../controllers/offer.controller";

const router = Router();
const applicationController = new ApplicationController();
const contractController = new ContractController();
const offerController = new OfferController();

router.get("/application", applicationController.checkApplication);
router.get("/client/job/applications", applicationController.getApplications);
router.get("/freelancer/job/applications", applicationController.getFreelancerApplications);

//contracts
router.get("/freelancer/contracts", contractController.getFreelancerContracts);
router.get("/client/hires", contractController.getJobContracts);  //want to change this;

//offers
router.get("/client/offers", offerController.clietOffers);  
router.get("/freelancer/offers", offerController.freelancerOffers); 





export default router;
